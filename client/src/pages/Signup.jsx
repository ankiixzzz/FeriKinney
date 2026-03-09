import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Select, message } from "antd";
import { RegisterUser } from "../apicalls/users";
import { useDispatch } from "react-redux";
import { setLoader } from "../redux/loadersSlice";
import Navbar from "../components/Navbar";
import NEPAL_LOCATIONS from "../data/nepalLocations";
import Kinbechlogo from "../images/kinbechLogo.png";

const rules = [{ required: true, message: "required" }];

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(setLoader(true));
      const response = await RegisterUser(values);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] flex">
        {/* Left brand panel */}
        <div className="hidden lg:flex flex-col justify-center items-start w-1/2 bg-[#14ae5c] px-16 py-12">
          <div className="flex items-center gap-3 mb-8">
            <img src={Kinbechlogo} alt="Kinbech" className="w-12 h-12 object-contain brightness-0 invert" />
            <span className="text-3xl font-bold text-white tracking-tight">Kinbech</span>
          </div>
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Start selling<br />in minutes
          </h2>
          <p className="text-green-100 text-lg leading-relaxed max-w-sm">
            Join thousands of buyers and sellers across Nepal on the most trusted classified marketplace.
          </p>
          <div className="mt-10 flex flex-col gap-4">
            {["Post ads for free", "Reach buyers in your city", "Chat and negotiate safely"].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-green-100 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right form panel */}
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 bg-gray-50 px-8 py-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Create an account</h1>
              <p className="text-gray-500 mt-2">Join Kinbech — it's free</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                  label={<span className="text-sm font-semibold text-gray-700">Full Name</span>}
                  name="name"
                  rules={rules}
                >
                  <Input
                    placeholder="Your full name"
                    size="large"
                    className="rounded-lg"
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="text-sm font-semibold text-gray-700">Email address</span>}
                  name="email"
                  rules={rules}
                >
                  <Input
                    placeholder="you@example.com"
                    size="large"
                    className="rounded-lg"
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="text-sm font-semibold text-gray-700">Password</span>}
                  name="password"
                  rules={rules}
                >
                  <Input.Password
                    placeholder="Create a password"
                    size="large"
                    className="rounded-lg"
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="text-sm font-semibold text-gray-700">Location</span>}
                  name="location"
                  rules={[{ required: true, message: "Please select your location" }]}
                >
                  <Select
                    showSearch
                    size="large"
                    placeholder="Search your city or town..."
                    optionFilterProp="label"
                    filterOption={(input, option) =>
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                    options={NEPAL_LOCATIONS.map((loc) => ({
                      value: loc,
                      label: loc,
                    }))}
                  />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  style={{ backgroundColor: "#14ae5c", borderColor: "#14ae5c", borderRadius: "10px", fontWeight: 600 }}
                >
                  Create account
                </Button>

                <div className="mt-6 text-center text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link className="text-[#14ae5c] hover:text-[#119e52] font-semibold" to="/login">
                    Sign in
                  </Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
