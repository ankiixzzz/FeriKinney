import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Tabs, Select } from "antd";
import { GetCurrentUser, UpdateUser, ChangePassword } from "../apicalls/users";
import { useDispatch } from "react-redux";
import { setLoader } from "../redux/loadersSlice";
import NEPAL_LOCATIONS from "../data/nepalLocations";

const { TabPane } = Tabs;

const rules = [
  {
    required: true,
    message: "Required",
  },
];

const Myprofile = () => {
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        dispatch(setLoader(true));
        const response = await GetCurrentUser();
        const userData = response.data;
        dispatch(setLoader(false));
        setCurrentUser(userData);

        profileForm.setFieldsValue({
          name: userData.name,
          email: userData.email,
          location: userData.location || "",
        });
      } catch (error) {
        dispatch(setLoader(false));
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleProfileSave = async (values) => {
    try {
      dispatch(setLoader(true));
      const { name, email, location } = values;

      if (currentUser && currentUser._id) {
        await UpdateUser(currentUser._id, name, email, location);

        const updatedUserResponse = await GetCurrentUser();
        const updatedUserData = updatedUserResponse.data;
        message.success("Profile information updated successfully");

        dispatch(setLoader(false));
        setCurrentUser(updatedUserData);

        profileForm.setFieldsValue({
          name: updatedUserData.name,
          email: updatedUserData.email,
          location: updatedUserData.location || "",
        });
      } else {
        throw new Error("User ID is undefined or null.");
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const handlePasswordSave = async (values) => {
    try {
      dispatch(setLoader(true));
      const { password, confirmPassword } = values;

      if (currentUser && currentUser._id) {
        if (password !== confirmPassword) {
          dispatch(setLoader(false));
          throw new Error("Password and Confirm Password do not match.");
        }

        await ChangePassword(currentUser._id, password);

        message.success("Password updated successfully");
        dispatch(setLoader(false));

        passwordForm.resetFields();
      } else {
        throw new Error("User ID is undefined or null.");
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Profile header card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <div className="h-24 bg-gradient-to-r from-[#14ae5c] to-[#0d8a49]" />
        <div className="px-8 pb-6">
          <div className="flex items-end gap-5 -mt-10 mb-4">
            <div className="w-20 h-20 rounded-2xl bg-white border-4 border-white shadow-md flex items-center justify-center bg-[#14ae5c]">
              <span className="text-3xl font-bold text-white uppercase">
                {currentUser?.name?.charAt(0) || "?"}
              </span>
            </div>
            <div className="pb-1">
              <h1 className="text-xl font-bold text-gray-900">{currentUser?.name || "Loading..."}</h1>
              <p className="text-sm text-gray-500">{currentUser?.email || ""}</p>
            </div>
          </div>
          {currentUser?.location && (
            <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {currentUser.location}
            </span>
          )}
        </div>
      </div>

      {/* Edit form card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Profile Info" key="1">
            <Form layout="vertical" form={profileForm} onFinish={handleProfileSave} className="mt-2">
              <Form.Item
                label={<span className="text-sm font-semibold text-gray-700">Full Name</span>}
                name="name"
                rules={rules}
              >
                <Input
                  placeholder="Full Name"
                  size="large"
                  className="rounded-lg"
                />
              </Form.Item>
              <Form.Item
                label={<span className="text-sm font-semibold text-gray-700">Email</span>}
                name="email"
                rules={rules}
              >
                <Input
                  placeholder="Email"
                  size="large"
                  className="rounded-lg"
                />
              </Form.Item>
              <Form.Item
                label={<span className="text-sm font-semibold text-gray-700">Location</span>}
                name="location"
              >
                <Select
                  showSearch
                  allowClear
                  size="large"
                  placeholder="Select your city or town..."
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
                size="large"
                style={{ backgroundColor: "#14ae5c", borderColor: "#14ae5c", borderRadius: "10px", fontWeight: 600 }}
              >
                Save changes
              </Button>
            </Form>
          </TabPane>

          <TabPane tab="Change Password" key="2">
            <Form layout="vertical" form={passwordForm} onFinish={handlePasswordSave} className="mt-2">
              <Form.Item
                label={<span className="text-sm font-semibold text-gray-700">New Password</span>}
                name="password"
                rules={rules}
              >
                <Input.Password
                  placeholder="New Password"
                  size="large"
                  className="rounded-lg"
                />
              </Form.Item>
              <Form.Item
                label={<span className="text-sm font-semibold text-gray-700">Confirm Password</span>}
                name="confirmPassword"
                rules={rules}
              >
                <Input.Password
                  placeholder="Confirm Password"
                  size="large"
                  className="rounded-lg"
                />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{ backgroundColor: "#14ae5c", borderColor: "#14ae5c", borderRadius: "10px", fontWeight: 600 }}
              >
                Update password
              </Button>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Myprofile;
