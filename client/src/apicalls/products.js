import { axiosInstance } from "./axiosinstance";

//add a new product
export const Addproduct = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/products/add-product",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get all products
export const GetProducts = async (filters) => {
  try {
    const response = await axiosInstance.post(
      "api/products/get-products",
      filters
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// edit product
export const EditProduct = async (id, payload) => {
  try {
    const response = await axiosInstance.put(
      `/api/products/edit-product/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//get product by id
export const GetProductById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/products/get-product-by-id/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//delete product

export const DeleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/products/delete-product/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//upload product image
export const UploadProductImage = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/products/upload-image-to-product",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//update product status
export const UpdateProductStatus = async (id, status) => {
  try {
    const response = await axiosInstance.put(
      `/api/products/update-product-status/${id}`,
      { status }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//place a new bid
export const PlaceNewBid = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/bids/place-new-bid",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//get all bids

export const GetAllBids = async (filters) => {
  try {
    const response = await axiosInstance.post(
      "/api/bids/get-all-bids",
      filters
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//update Bid status
export const UpdateBidStatus = async (id, status) => {
  try {
    const response = await axiosInstance.put(
      `/api/bids/update-bids-status/${id}`,
      { status }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//update view count
export const UpdateViewCount = async (id) => {
  try {
    // Make a POST request to the "/update-view-count" endpoint
    const response = await axiosInstance.post(
      `/api/products/update-view-count/${id}`
    );

    // Extract the updated view count from the response
    const updatedViewCount = response.data.viewCount;

    // Return the updated view count if needed
    return updatedViewCount;
  } catch (error) {
    return error.message;
  }
};

//delete a bid
export const DeleteBid = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/bids/delete-bid/${id}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// Price Comparison: get similar products in same category sorted by price
export const GetPriceComparison = async (productId) => {
  try {
    const response = await axiosInstance.get(
      `/api/products/price-comparison/${productId}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Seller requests a promotion
export const RequestPromotion = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/promotions/request-promotion",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Get all promotions (admin)
export const GetPromotions = async (filters) => {
  try {
    const response = await axiosInstance.post(
      "/api/promotions/get-promotions",
      filters
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Admin approve/reject a promotion
export const UpdatePromotionStatus = async (id, payload) => {
  try {
    const response = await axiosInstance.put(
      `/api/promotions/update-promotion-status/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Seller gets their own promotion requests
export const GetMyPromotions = async () => {
  try {
    const response = await axiosInstance.get("/api/promotions/my-promotions");
    return response.data;
  } catch (error) {
    return error.message;
  }
};
