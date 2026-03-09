import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Table, Tag, message } from "antd";
import ProductsForm from "./ProductsForm";
import PromotionModal from "./PromotionModal";
import { useDispatch, useSelector } from "react-redux";
import { DeleteProduct, GetProducts } from "../../../apicalls/products";
import { setLoader } from "../../../redux/loadersSlice";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LiaCommentsDollarSolid } from "react-icons/lia";
import { MdWorkspacePremium } from "react-icons/md";
import moment from "moment";
import Bids from "./Bids";

function Products() {
  const [showBids, setShowBids] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [products, setProducts] = React.useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showPromotionModal, setShowPromotionModal] = useState(false);
  const [promotionProduct, setPromotionProduct] = useState(null);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetProducts({
        seller: user._id,
      });
      dispatch(setLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      dispatch(setLoader(true));
      const response = await DeleteProduct(id);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const getPromotionTag = (record) => {
    if (!record.promotionStatus || record.promotionStatus === "none") return null;
    const colorMap = {
      pending: "processing",
      approved: record.promotionType === "premium" ? "gold" : "blue",
      rejected: "error",
    };
    const labelMap = {
      pending: "Promo Pending",
      approved:
        record.promotionType === "premium" ? "Premium Ad" : "Featured Ad",
      rejected: "Promo Rejected",
    };
    return (
      <Tag color={colorMap[record.promotionStatus]} className="mt-1">
        {labelMap[record.promotionStatus]}
      </Tag>
    );
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "image",
      render: (text, record) => {
        return (
          <img
            src={record?.images?.length > 0 ? record.images[0] : ""}
            alt={record.name || "Product"}
            className="w-20 h-20 object-cover rounded-md"
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Location",
      dataIndex: "location",
      render: (text) => text || "-",
    },
    {
      title: "Condition",
      dataIndex: "condition",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        let tagColor;
        switch (record.status) {
          case "approved":
            tagColor = "success";
            break;
          case "pending":
            tagColor = "processing";
            break;
          case "rejected":
            tagColor = "error";
            break;
          case "blocked":
            tagColor = "error";
            break;
          default:
            tagColor = "default";
        }
        return (
          <div className="flex flex-col gap-1">
            <Tag color={tagColor}>{record.status.toUpperCase()}</Tag>
            {getPromotionTag(record)}
          </div>
        );
      },
    },
    {
      title: "Added On",
      dataIndex: "createdAt",
      render: (text, record) =>
        moment(record.createdAt).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Views",
      dataIndex: "viewCount",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        const canPromote =
          record.status === "approved" &&
          (!record.promotionStatus ||
            record.promotionStatus === "none" ||
            record.promotionStatus === "rejected");

        return (
          <div className="flex gap-3 cursor-pointer items-center">
            <BiEdit
              size={18}
              onClick={() => {
                setSelectedProduct(record);
                setShowProductForm(true);
              }}
            />
            <Popconfirm
              title="Are you sure to delete this product?"
              onConfirm={() => deleteProduct(record._id)}
              okText="Yes"
              cancelText="No"
              okType="default"
            >
              <RiDeleteBin6Line size={18} />
            </Popconfirm>
            <LiaCommentsDollarSolid
              size={18}
              onClick={() => {
                setSelectedProduct(record);
                setShowBids(true);
              }}
            />
            {canPromote && (
              <MdWorkspacePremium
                size={20}
                className="text-yellow-500 cursor-pointer"
                title="Request Promotion"
                onClick={() => {
                  setPromotionProduct(record);
                  setShowPromotionModal(true);
                }}
              />
            )}
            {record.promotionStatus === "pending" && (
              <span className="text-xs text-yellow-600">Promo pending...</span>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex justify-end">
        <Button
          type="default"
          onClick={() => {
            setSelectedProduct(null);
            setShowProductForm(true);
          }}
        >
          Add Product
        </Button>
      </div>
      <Table
        className="mt-4"
        columns={columns}
        dataSource={products}
        rowKey="_id"
      />
      {showProductForm && (
        <ProductsForm
          showProductForm={showProductForm}
          setShowProductForm={setShowProductForm}
          selectedProduct={selectedProduct}
          getData={getData}
        />
      )}

      {showBids && (
        <Bids
          showBidsModal={showBids}
          setShowBidsModal={setShowBids}
          selectedProduct={selectedProduct}
        />
      )}

      {showPromotionModal && promotionProduct && (
        <PromotionModal
          showModal={showPromotionModal}
          setShowModal={setShowPromotionModal}
          selectedProduct={promotionProduct}
          onSuccess={getData}
        />
      )}
    </div>
  );
}

export default Products;
