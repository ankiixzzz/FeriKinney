import React from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { LoginUser } from "../apicalls/users";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoader } from "../redux/loadersSlice";
import Navbar from "../components/Navbar";
import Kinbechlogo from "../images/kinbechLogo.png";

const rules = [
  {
    required: true,
    message: "required",
  },
];

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(setLoader(true));
      const response = await LoginUser(values);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/";
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
            Nepal's trusted<br />marketplace
          </h2>
          <p className="text-green-100 text-lg leading-relaxed max-w-sm">
            Buy and sell second-hand goods safely and easily. Thousands of listings across Nepal.
          </p>
          <div className="mt-10 flex flex-col gap-4">
            {["Free to list your products", "Verified buyers and sellers", "Secure bidding system"].map((item) => (
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
              <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
              <p className="text-gray-500 mt-2">Sign in to your Kinbech account</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <Form layout="vertical" onFinish={onFinish}>
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
                    placeholder="Enter your password"
                    size="large"
                    className="rounded-lg"
                  />
                </Form.Item>

                <div className="mb-4 text-right">
                  <Link className="text-sm text-[#14ae5c] hover:text-[#119e52] font-medium" to="/forgotpassword">
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  style={{ backgroundColor: "#14ae5c", borderColor: "#14ae5c", borderRadius: "10px", fontWeight: 600 }}
                >
                  Sign in
                </Button>

                <div className="mt-6 text-center text-sm text-gray-500">
                  Don't have an account?{" "}
                  <Link className="text-[#14ae5c] hover:text-[#119e52] font-semibold" to="/signup">
                    Create one free
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

export default Login;
