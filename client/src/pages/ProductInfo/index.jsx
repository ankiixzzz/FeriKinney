import React, { useEffect, useState } from "react";
import { Alert, Button, Tag, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { MdTrendingDown, MdLocationOn } from "react-icons/md";

import {
  GetAllBids,
  GetProductById,
  GetPriceComparison,
  UpdateViewCount,
} from "../../apicalls/products";
import { setLoader } from "../../redux/loadersSlice";
import moment from "moment";
import BidModal from "./BidModal";

const ProductInfo = () => {
  const [viewCount, setViewCount] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const { user } = useSelector((state) => state.users);
  const [showAddNewBid, setShowAddNewBid] = React.useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [product, setProduct] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetProductById(id);
      dispatch(setLoader(false));
      if (response.success) {
        const bidsResponse = await GetAllBids({ product: id });
        setProduct({
          ...response.data,
          bids: bidsResponse.data,
        });

        const compResponse = await GetPriceComparison(id);
        if (compResponse.success) {
          setSimilarProducts(compResponse.data);
        }
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const isBidAccepted = () => {
    return product.bids.some((bid) => bid.status === "accepted");
  };

  useEffect(() => {
    getData();

    UpdateViewCount(id)
      .then((updatedViewCount) => {
        setViewCount(updatedViewCount);
      })
      .catch((error) => {
        message.error(error.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCheaperCount = () => {
    if (!product || similarProducts.length === 0) return 0;
    return similarProducts.filter((p) => p.price < product.price).length;
  };

  const getPriceTag = (simPrice) => {
    if (!product) return null;
    if (simPrice < product.price)
      return <Tag color="green">Cheaper</Tag>;
    if (simPrice > product.price)
      return <Tag color="red">More Expensive</Tag>;
    return <Tag color="default">Same Price</Tag>;
  };

  return (
    product && (
      <div className="py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image gallery */}
          <div className="flex flex-col gap-3">
            <div className="rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 flex-wrap">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    className={`w-18 h-18 object-cover rounded-xl cursor-pointer border-2 transition-all ${
                      selectedImageIndex === index
                        ? "border-[#14ae5c]"
                        : "border-transparent hover:border-gray-300"
                    }`}
                    style={{ width: 72, height: 72 }}
                    onClick={() => setSelectedImageIndex(index)}
                    src={image}
                    alt=""
                  />
                ))}
              </div>
            )}
            <span className="flex gap-1.5 items-center text-sm text-gray-400">
              <FaRegEye size={14} />
              {viewCount} views
            </span>
          </div>

          {/* Product details */}
          <div className="flex flex-col gap-5">
            {/* Title & promotion */}
            <div>
              <div className="flex items-start gap-2 flex-wrap mb-1">
                <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                {product.promotionStatus === "approved" &&
                  product.promotionExpiresAt &&
                  new Date(product.promotionExpiresAt) > new Date() && (
                    <Tag
                      color={product.promotionType === "premium" ? "gold" : "blue"}
                      className="mt-1"
                    >
                      {product.promotionType === "premium" ? "PREMIUM AD" : "FEATURED AD"}
                    </Tag>
                  )}
              </div>
              <span className="inline-block bg-green-50 text-[#14ae5c] text-sm font-semibold px-3 py-1 rounded-full">
                {product.condition}
              </span>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>

            {/* Price + meta */}
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-[#14ae5c]">Rs. {product.price}</span>
              </div>
              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <span className="text-gray-500">Category</span>
                <span className="text-gray-900 font-medium text-right">{product.category}</span>

                <span className="text-gray-500">Bill Available</span>
                <span className="text-gray-900 font-medium text-right">{product.billAvaiable ? "Yes" : "No"}</span>

                <span className="text-gray-500">Warranty</span>
                <span className="text-gray-900 font-medium text-right">{product.warrantyAvailable ? "Yes" : "No"}</span>

                {product.location && (
                  <>
                    <span className="text-gray-500">Location</span>
                    <span className="text-gray-900 font-medium text-right flex items-center justify-end gap-1">
                      <MdLocationOn size={13} className="text-[#14ae5c]" />
                      {product.location}
                    </span>
                  </>
                )}

                <span className="text-gray-500">Posted</span>
                <span className="text-gray-900 font-medium text-right">{moment(product.createdAt).fromNow()}</span>
              </div>
            </div>

            {/* Seller */}
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-3">Seller</h2>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#14ae5c] flex items-center justify-center text-white font-bold text-sm uppercase">
                  {product.seller.name.charAt(0)}
                </div>
                <span className="font-semibold text-gray-900">{product.seller.name}</span>
              </div>
            </div>

            {/* Bids */}
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Bids</h2>
                <Button
                  onClick={() => setShowAddNewBid(!showAddNewBid)}
                  disabled={user._id === product.seller._id || isBidAccepted()}
                  size="small"
                  style={{ borderRadius: 8 }}
                >
                  Place a Bid
                </Button>
              </div>
              {isBidAccepted() && (
                <Alert
                  message="This item has been sold. Bids are no longer accepted."
                  banner
                  className="mb-3 rounded-xl"
                />
              )}
              {product.ShowProductBids && product.bids?.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {product.bids.map((bid) => (
                    <div key={bid._id} className="bg-white rounded-xl border border-gray-100 p-3 text-sm">
                      <div className="flex justify-between text-gray-600 mb-1">
                        <span className="font-medium text-gray-900">{bid.buyer.name}</span>
                        <span className="text-[#14ae5c] font-bold">Rs. {bid.bidAmount}</span>
                      </div>
                      <span className="text-xs text-gray-400">{moment(bid.createdAt).calendar()}</span>
                    </div>
                  ))}
                </div>
              ) : (
                !isBidAccepted() && <p className="text-sm text-gray-400">No bids yet. Be the first!</p>
              )}
            </div>
          </div>
        </div>

        {/* Price Comparison */}
        {similarProducts.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center gap-2 mb-4">
              <MdTrendingDown size={22} className="text-[#14ae5c]" />
              <h2 className="text-lg font-bold text-gray-900">Price Comparison</h2>
              <span className="text-sm text-gray-400">— Similar {product.category} listings</span>
            </div>
            {getCheaperCount() > 0 && (
              <Alert
                type="info"
                message={`${getCheaperCount()} cheaper listing${getCheaperCount() > 1 ? "s" : ""} found in the same category.`}
                className="mb-4 rounded-xl"
                showIcon
              />
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {similarProducts.map((sim) => (
                <div
                  key={sim._id}
                  className={`bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden ${
                    sim.price < product.price ? "border-green-300" : "border-gray-100"
                  }`}
                  onClick={() => navigate(`/product/${sim._id}`)}
                >
                  <img src={sim.images[0]} alt="" className="w-full h-32 object-cover" />
                  <div className="p-3 flex flex-col gap-1">
                    <p className="text-sm font-semibold text-gray-900 line-clamp-1">{sim.name}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#14ae5c] font-bold text-sm">Rs. {sim.price}</span>
                      {getPriceTag(sim.price)}
                    </div>
                    <span className="text-xs text-gray-400">{sim.condition}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {showAddNewBid && (
          <BidModal
            product={product}
            reloadData={getData}
            showBidModal={showAddNewBid}
            setShowBidModal={setShowAddNewBid}
            price={product.price}
          />
        )}
      </div>
    )
  );
};

export default ProductInfo;
