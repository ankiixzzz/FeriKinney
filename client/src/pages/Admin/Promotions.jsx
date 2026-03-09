import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Tag,
  message,
  Modal,
  Input,
  Popconfirm,
} from "antd";
import { useDispatch } from "react-redux";
import { GetPromotions, UpdatePromotionStatus } from "../../apicalls/products";
import { setLoader } from "../../redux/loadersSlice";
import moment from "moment";
import { MdStar, MdWorkspacePremium } from "react-icons/md";

function Promotions() {
  const [promotions, setPromotions] = useState([]);
  const [rejectionModal, setRejectionModal] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetPromotions({});
      dispatch(setLoader(false));
      if (response.success) {
        setPromotions(response.data);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const onApprove = async (id) => {
    try {
      dispatch(setLoader(true));
      const response = await UpdatePromotionStatus(id, { status: "approved" });
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

  const onRejectSubmit = async () => {
    try {
      dispatch(setLoader(true));
      const response = await UpdatePromotionStatus(selectedPromotion._id, {
        status: "rejected",
        rejectionReason,
      });
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        setRejectionModal(false);
        setRejectionReason("");
        setSelectedPromotion(null);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Product",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.product?.images?.[0] || ""}
            alt=""
            className="w-14 h-14 object-cover rounded"
          />
          <span className="font-medium">{record.product?.name}</span>
        </div>
      ),
    },
    {
      title: "Seller",
      render: (_, record) => (
        <div>
          <p className="font-medium">{record.seller?.name}</p>
          <p className="text-xs text-gray-400">{record.seller?.email}</p>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "promotionType",
      render: (type) =>
        type === "premium" ? (
          <Tag
            icon={<MdWorkspacePremium className="inline mr-1" />}
            color="gold"
          >
            PREMIUM
          </Tag>
        ) : (
          <Tag icon={<MdStar className="inline mr-1" />} color="blue">
            FEATURED
          </Tag>
        ),
    },
    {
      title: "Duration",
      dataIndex: "durationDays",
      render: (days) => `${days} days`,
    },
    {
      title: "Product Price",
      render: (_, record) => `Rs. ${record.product?.price}`,
    },
    {
      title: "Requested On",
      dataIndex: "createdAt",
      render: (val) => moment(val).format("DD-MM-YYYY"),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        const colorMap = {
          pending: "processing",
          approved: "success",
          rejected: "error",
          expired: "default",
        };
        return <Tag color={colorMap[status] || "default"}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Expires",
      render: (_, record) =>
        record.expiresAt
          ? moment(record.expiresAt).format("DD-MM-YYYY")
          : "—",
    },
    {
      title: "Seller Message",
      dataIndex: "message",
      render: (msg) => msg || "—",
    },
    {
      title: "Action",
      render: (_, record) => {
        if (record.status === "pending") {
          return (
            <div className="flex gap-2">
              <Popconfirm
                title="Approve this promotion request?"
                onConfirm={() => onApprove(record._id)}
                okText="Approve"
                cancelText="Cancel"
                okType="default"
              >
                <Button type="default" size="small">
                  Approve
                </Button>
              </Popconfirm>
              <Button
                danger
                size="small"
                onClick={() => {
                  setSelectedPromotion(record);
                  setRejectionModal(true);
                }}
              >
                Reject
              </Button>
            </div>
          );
        }
        if (record.status === "approved") {
          return (
            <span className="text-green-500 text-xs font-semibold">Active</span>
          );
        }
        if (record.status === "rejected") {
          return (
            <span className="text-red-400 text-xs">
              Rejected{record.rejectionReason ? `: ${record.rejectionReason}` : ""}
            </span>
          );
        }
        return <span className="text-gray-400 text-xs">Expired</span>;
      },
    },
  ];

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pendingCount = promotions.filter((p) => p.status === "pending").length;

  return (
    <div>
      {pendingCount > 0 && (
        <div className="mb-3 text-sm text-yellow-600 font-medium">
          {pendingCount} promotion request{pendingCount > 1 ? "s" : ""} awaiting review
        </div>
      )}
      <Table
        className="mt-2"
        columns={columns}
        dataSource={promotions}
        rowKey="_id"
        rowClassName={(record) =>
          record.status === "pending" ? "bg-yellow-50" : ""
        }
      />

      {/* Rejection reason modal */}
      <Modal
        title="Reject Promotion"
        open={rejectionModal}
        onCancel={() => {
          setRejectionModal(false);
          setRejectionReason("");
          setSelectedPromotion(null);
        }}
        onOk={onRejectSubmit}
        okText="Confirm Reject"
        okButtonProps={{ danger: true }}
      >
        <p className="mb-2 text-sm text-gray-600">
          Optionally provide a reason for rejection (will be sent to the seller):
        </p>
        <Input.TextArea
          rows={3}
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
          placeholder="Reason for rejection (optional)"
        />
      </Modal>
    </div>
  );
}

export default Promotions;
