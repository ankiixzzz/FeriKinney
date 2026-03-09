import React, { useEffect } from "react";
import "../../App.css";
import { GetProducts } from "../../apicalls/products";
import { message } from "antd";
import { setLoader } from "../../redux/loadersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";
import { IoSearch, IoFilter } from "react-icons/io5";
import { MdStar, MdWorkspacePremium, MdLocationOn } from "react-icons/md";

const Home = () => {
  const [showFilters, setShowFilters] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [products, setProducts] = React.useState([]);
  const { user } = useSelector((state) => state.users);

  const [filters, setFilters] = React.useState({
    status: "approved",
    category: [],
    condition: [],
    location: user?.location || "",
  });

  const [locationFilterActive, setLocationFilterActive] = React.useState(
    !!(user?.location)
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetProducts({ ...filters, search: searchQuery });
      dispatch(setLoader(false));
      if (response.success) {
        const sorted = [...response.data].sort((a, b) => {
          const order = { premium: 0, featured: 1, none: 2 };
          const aPromo = isActivePromotion(a) ? a.promotionType : "none";
          const bPromo = isActivePromotion(b) ? b.promotionType : "none";
          if (order[aPromo] !== order[bPromo]) {
            return order[aPromo] - order[bPromo];
          }
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setProducts(sorted);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const isActivePromotion = (product) => {
    if (product.promotionStatus !== "approved") return false;
    if (!product.promotionExpiresAt) return false;
    return new Date(product.promotionExpiresAt) > new Date();
  };

  const toggleLocationFilter = () => {
    const next = !locationFilterActive;
    setLocationFilterActive(next);
    setFilters((prev) => ({
      ...prev,
      location: next ? (user?.location || "") : "",
    }));
  };

  useEffect(() => {
    if (searchQuery === "") {
      getData();
      return;
    }
    const timer = setTimeout(() => {
      getData();
    }, 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, searchQuery]);

  const getPromotionBadge = (product) => {
    if (!isActivePromotion(product)) return null;
    if (product.promotionType === "premium") {
      return (
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-yellow-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
          <MdWorkspacePremium size={13} />
          PREMIUM
        </div>
      );
    }
    if (product.promotionType === "featured") {
      return (
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-blue-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
          <MdStar size={13} />
          FEATURED
        </div>
      );
    }
    return null;
  };

  const getCardRing = (product) => {
    if (!isActivePromotion(product)) return "";
    if (product.promotionType === "premium") return "ring-2 ring-yellow-400";
    if (product.promotionType === "featured") return "ring-2 ring-blue-400";
    return "";
  };

  return (
    <div>
      <div className="flex gap-6">
        {showFilters && (
          <Filters
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            filters={filters}
            setFilters={setFilters}
          />
        )}
        <div className="flex flex-col gap-4 w-full min-w-0">
          {/* Search bar */}
          <div className="flex items-center gap-2">
            {!showFilters && (
              <button
                className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-gray-600"
                onClick={() => setShowFilters(!showFilters)}
                aria-label="Show filters"
              >
                <IoFilter size={20} />
              </button>
            )}
            <div className="flex flex-1 items-center bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-[#14ae5c] focus-within:border-[#14ae5c] transition-all">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2.5 text-sm focus:outline-none bg-transparent"
              />
              <button className="px-4 h-full bg-[#14ae5c] hover:bg-[#119e52] transition-colors flex items-center justify-center py-2.5">
                <IoSearch size={18} className="text-white" />
              </button>
            </div>
          </div>

          {/* Location pill + promotions label */}
          <div className="flex items-center gap-3 flex-wrap">
            {user?.location && (
              <button
                onClick={toggleLocationFilter}
                className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full border font-medium transition-all ${
                  locationFilterActive
                    ? "bg-[#14ae5c] text-white border-[#14ae5c] shadow-sm"
                    : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
                }`}
              >
                <MdLocationOn size={15} />
                {locationFilterActive ? `Near: ${user.location}` : "All Nepal"}
              </button>
            )}
            {products.some((p) => isActivePromotion(p)) && (
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <MdWorkspacePremium size={14} className="text-yellow-500" />
                Promoted listings appear first
              </span>
            )}
          </div>

          {/* Product grid */}
          <div
            className={`grid gap-4 ${showFilters ? "grid-cols-2 xl:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4"}`}
          >
            {products.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
                <svg className="w-12 h-12 mb-3 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-sm">
                  No products found{locationFilterActive && user?.location ? ` in ${user.location}` : ""}.
                </p>
                {locationFilterActive && user?.location && (
                  <button
                    className="mt-2 text-[#14ae5c] text-sm font-medium hover:underline"
                    onClick={toggleLocationFilter}
                  >
                    Show all Nepal
                  </button>
                )}
              </div>
            )}
            {products.map((product) => {
              const promoted = isActivePromotion(product);
              return (
                <div
                  className={`bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer relative overflow-hidden group ${getCardRing(product)}`}
                  key={product._id}
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  {getPromotionBadge(product)}
                  <div className="overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 flex flex-col gap-1">
                    <h2 className="text-sm font-semibold text-gray-900 line-clamp-1">{product.name}</h2>
                    <p className="text-xs text-gray-400 line-clamp-1">{product.description}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-base font-bold text-[#14ae5c]">Rs. {product.price}</span>
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{product.condition}</span>
                    </div>
                    {product.location && (
                      <span className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                        <MdLocationOn size={11} />
                        {product.location}
                      </span>
                    )}
                    {promoted && (
                      <span className="text-xs text-gray-300 mt-0.5">
                        Ad expires: {new Date(product.promotionExpiresAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
