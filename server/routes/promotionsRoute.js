const router = require("express").Router();
const Promotion = require("../models/promotionModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const Notification = require("../models/notificationsModel");
const authMiddleware = require("../middlewares/authMiddleware");

// Seller requests a promotion for their product
router.post("/request-promotion", authMiddleware, async (req, res) => {
  try {
    const { productId, promotionType, durationDays, message } = req.body;
    const sellerId = req.body.userId;

    // Verify product belongs to seller and is approved
    const product = await Product.findById(productId);
    if (!product) {
      return res.send({ success: false, message: "Product not found" });
    }
    if (product.seller.toString() !== sellerId.toString()) {
      return res.send({ success: false, message: "Unauthorized" });
    }
    if (product.status !== "approved") {
      return res.send({
        success: false,
        message: "Only approved products can be promoted",
      });
    }

    // Check if there is already a pending promotion for this product
    const existing = await Promotion.findOne({
      product: productId,
      status: "pending",
    });
    if (existing) {
      return res.send({
        success: false,
        message: "A promotion request is already pending for this product",
      });
    }

    const newPromotion = new Promotion({
      product: productId,
      seller: sellerId,
      promotionType,
      durationDays: durationDays || 7,
      message: message || "",
      status: "pending",
    });
    await newPromotion.save();

    // Update product promotionStatus to pending
    await Product.findByIdAndUpdate(productId, {
      promotionStatus: "pending",
      promotionType,
    });

    // Notify all admins
    const admins = await User.find({ role: "admin" });
    for (const admin of admins) {
      const notification = new Notification({
        user: admin._id,
        title: "New Promotion Request",
        message: `A seller has requested a ${promotionType} promotion for "${product.name}"`,
        onClick: "/admin",
        read: false,
      });
      await notification.save();
    }

    res.send({ success: true, message: "Promotion request submitted successfully" });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});

// Admin: get all promotion requests (optionally filtered by status)
router.post("/get-promotions", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    let filters = {};
    if (status) filters.status = status;

    const promotions = await Promotion.find(filters)
      .populate("product", "name images price category")
      .populate("seller", "name email")
      .populate("reviewedBy", "name")
      .sort({ createdAt: -1 });

    res.send({ success: true, data: promotions });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});

// Admin: approve or reject a promotion
router.put("/update-promotion-status/:id", authMiddleware, async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;
    const adminId = req.body.userId;

    const promotion = await Promotion.findById(req.params.id);
    if (!promotion) {
      return res.send({ success: false, message: "Promotion not found" });
    }

    const now = new Date();
    const expiresAt = new Date(
      now.getTime() + promotion.durationDays * 24 * 60 * 60 * 1000
    );

    const updateData = {
      status,
      reviewedBy: adminId,
      reviewedAt: now,
    };

    if (status === "approved") {
      updateData.startsAt = now;
      updateData.expiresAt = expiresAt;
    }
    if (status === "rejected" && rejectionReason) {
      updateData.rejectionReason = rejectionReason;
    }

    await Promotion.findByIdAndUpdate(req.params.id, updateData);

    // Update the product's promotion fields
    if (status === "approved") {
      await Product.findByIdAndUpdate(promotion.product, {
        promotionStatus: "approved",
        promotionType: promotion.promotionType,
        promotionExpiresAt: expiresAt,
      });
    } else if (status === "rejected") {
      await Product.findByIdAndUpdate(promotion.product, {
        promotionStatus: "rejected",
        promotionType: "none",
        promotionExpiresAt: null,
      });
    }

    // Notify seller
    const product = await Product.findById(promotion.product);
    const notificationMsg =
      status === "approved"
        ? `Your ${promotion.promotionType} promotion for "${product.name}" has been approved! It will run for ${promotion.durationDays} days.`
        : `Your ${promotion.promotionType} promotion request for "${product.name}" was rejected.${
            rejectionReason ? " Reason: " + rejectionReason : ""
          }`;

    const sellerNotification = new Notification({
      user: promotion.seller,
      title: `Promotion ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      message: notificationMsg,
      onClick: "/SellerDashboard",
      read: false,
    });
    await sellerNotification.save();

    res.send({ success: true, message: `Promotion ${status} successfully` });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});

// Get seller's own promotion requests
router.get("/my-promotions", authMiddleware, async (req, res) => {
  try {
    const sellerId = req.body.userId;
    const promotions = await Promotion.find({ seller: sellerId })
      .populate("product", "name images price category")
      .sort({ createdAt: -1 });

    res.send({ success: true, data: promotions });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});

// Auto-expire promotions (can be called via a cron or on-demand)
// For simplicity, this endpoint checks and deactivates expired promotions
router.post("/expire-promotions", async (req, res) => {
  try {
    const now = new Date();
    const expiredPromotions = await Promotion.find({
      status: "approved",
      expiresAt: { $lte: now },
    });

    for (const promo of expiredPromotions) {
      await Promotion.findByIdAndUpdate(promo._id, { status: "expired" });
      await Product.findByIdAndUpdate(promo.product, {
        promotionStatus: "none",
        promotionType: "none",
        promotionExpiresAt: null,
      });
    }

    res.send({
      success: true,
      message: `${expiredPromotions.length} promotions expired`,
    });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});

module.exports = router;
