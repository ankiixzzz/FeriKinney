const mongoose = require("mongoose");

const promotionSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    promotionType: {
      type: String,
      enum: ["featured", "premium"],
      required: true,
    },
    // Duration in days requested by seller
    durationDays: {
      type: Number,
      required: true,
      default: 7,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    // Admin who reviewed the request
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: null,
    },
    reviewedAt: {
      type: Date,
      default: null,
    },
    // When the promotion actually starts and ends (set on approval)
    startsAt: {
      type: Date,
      default: null,
    },
    expiresAt: {
      type: Date,
      default: null,
    },
    // Optional message from seller to admin
    message: {
      type: String,
      default: "",
    },
    // Admin rejection reason
    rejectionReason: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("promotions", promotionSchema);
