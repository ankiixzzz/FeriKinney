import React from "react";
import { Modal, Form, Select, InputNumber, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { RequestPromotion } from "../../../apicalls/products";
import { setLoader } from "../../../redux/loadersSlice";

const { Option } = Select;

function PromotionModal({ showModal, setShowModal, selectedProduct, onSuccess }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    try {
      dispatch(setLoader(true));
      const response = await RequestPromotion({
        productId: selectedProduct._id,
        promotionType: values.promotionType,
        durationDays: values.durationDays,
        message: values.message || "",
      });
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        form.resetFields();
        setShowModal(false);
        if (onSuccess) onSuccess();
      } else {
        message.error(response.message || response);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  return (
    <Modal
      title={`Request Promotion for "${selectedProduct?.name}"`}
      open={showModal}
      onCancel={() => {
        form.resetFields();
        setShowModal(false);
      }}
      footer={null}
    >
      <div className="mb-4 text-sm text-gray-500">
        Promote your listing to reach more buyers. Promoted ads appear at the
        top of search results and on the homepage.
      </div>
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          label="Promotion Type"
          name="promotionType"
          rules={[{ required: true, message: "Please select a promotion type" }]}
        >
          <Select placeholder="Select type">
            <Option value="featured">
              Featured — Highlighted in blue, shown before regular listings
            </Option>
            <Option value="premium">
              Premium — Gold badge, shown at the very top of all results
            </Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Duration (days)"
          name="durationDays"
          initialValue={7}
          rules={[{ required: true, message: "Please specify duration" }]}
        >
          <InputNumber min={1} max={90} className="w-full" />
        </Form.Item>

        <Form.Item
          label="Message to Admin (optional)"
          name="message"
        >
          <Input.TextArea
            rows={3}
            placeholder="Any additional info for the admin..."
          />
        </Form.Item>

        <div className="flex justify-end gap-3">
          <Button onClick={() => { form.resetFields(); setShowModal(false); }}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" style={{ background: "#14ae5c" }}>
            Submit Request
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default PromotionModal;
