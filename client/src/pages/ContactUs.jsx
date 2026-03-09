import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import ProtectedPage from "../components/ProtectedPage";
import Navbar from "../components/Navbar";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const { TextArea } = Input;

const ContactUs = () => {
  const isLoggedIn = !!localStorage.getItem("token");
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    // Simulate a short delay so the user sees feedback
    setTimeout(() => {
      setSubmitting(false);
      message.success("Your message has been sent. We will get back to you shortly.");
      form.resetFields();
    }, 800);
  };

  const pageContent = (
    <div className="mt-6">
      <h1 className="text-3xl font-bold mb-1">Contact Us</h1>
      <p className="text-gray-500 mb-8">
        Have a question or feedback? We'd love to hear from you.
      </p>

      <div className="flex gap-8">
        {/* Contact Info */}
        <div className="w-1/3 flex flex-col gap-6">
          <div className="bg-[#fafafa] rounded-lg p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <MdEmail size={24} className="text-[#14ae5c]" />
              <h2 className="font-semibold text-base">Email</h2>
            </div>
            <p className="text-gray-600 text-sm">support@kinbech.com</p>
            <p className="text-gray-600 text-sm">info@kinbech.com</p>
          </div>

          <div className="bg-[#fafafa] rounded-lg p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <MdPhone size={24} className="text-[#14ae5c]" />
              <h2 className="font-semibold text-base">Phone</h2>
            </div>
            <p className="text-gray-600 text-sm">+977-01-4XXXXXX</p>
            <p className="text-gray-600 text-sm">+977-98XXXXXXXX</p>
          </div>

          <div className="bg-[#fafafa] rounded-lg p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <MdLocationOn size={24} className="text-[#14ae5c]" />
              <h2 className="font-semibold text-base">Address</h2>
            </div>
            <p className="text-gray-600 text-sm">
              Kinbech Pvt. Ltd.
              <br />
              Kathmandu, Nepal
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="w-2/3 bg-[#fafafa] rounded-lg p-8 border border-gray-200">
          <h2 className="font-semibold text-lg mb-6">Send us a message</h2>
          <Form layout="vertical" form={form} onFinish={handleSubmit}>
            <div className="flex gap-4">
              <Form.Item
                label="Your Name"
                name="name"
                className="font-semibold flex-1"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="Full Name" className="border rounded-sm py-2" />
              </Form.Item>
              <Form.Item
                label="Email Address"
                name="email"
                className="font-semibold flex-1"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Enter a valid email" },
                ]}
              >
                <Input placeholder="you@example.com" className="border rounded-sm py-2" />
              </Form.Item>
            </div>
            <Form.Item
              label="Subject"
              name="subject"
              className="font-semibold"
              rules={[{ required: true, message: "Please enter a subject" }]}
            >
              <Input placeholder="How can we help you?" className="border rounded-sm py-2" />
            </Form.Item>
            <Form.Item
              label="Message"
              name="message"
              className="font-semibold"
              rules={[{ required: true, message: "Please enter your message" }]}
            >
              <TextArea
                rows={6}
                placeholder="Write your message here..."
                className="border rounded-sm"
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              className="h-9 px-8 rounded bg-[#14ae5c] text-white text-base font-medium active:scale-[.98] active:duration-75 transition-all ease-in-out"
            >
              Send Message
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );

  if (isLoggedIn) {
    return <ProtectedPage>{pageContent}</ProtectedPage>;
  }

  return (
    <div>
      <Navbar />
      {pageContent}
    </div>
  );
};

export default ContactUs;
