import React, { useState, useEffect } from "react";
import { Dropdown, message } from "antd";
import { useNavigate } from "react-router-dom";
import { GetCurrentUser } from "../apicalls/users";
import { BiUser } from "react-icons/bi";
import { MdOutlineLogout, MdOutlineDashboard } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../redux/loadersSlice";
import { SetUser } from "../redux/usersSlice";
import Notifications from "./Notifications";
import {
  GetAllNotifications,
  ReadAllNotifications,
} from "../apicalls/notifications";
import Kinbechlogo from "../../src/images/kinbechLogo.png";

const UserProfileButton = ({ user }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/Login");
  };

  const menuItems = {
    items: [
      {
        key: "1",
        icon: <BiUser size={16} />,
        label: "My profile",
        onClick: () => navigate("/myprofile"),
      },
      {
        type: "divider",
      },
      {
        key: "2",
        icon: <MdOutlineLogout size={16} />,
        label: "Log out",
        danger: true,
        onClick: handleLogout,
      },
    ],
  };

  return (
    <Dropdown
      menu={menuItems}
      open={isDropdownOpen}
      onOpenChange={(open) => setIsDropdownOpen(open)}
      placement="bottomRight"
    >
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors border border-gray-200 select-none">
        <div className="w-7 h-7 rounded-full bg-[#14ae5c] flex items-center justify-center text-white text-xs font-bold uppercase">
          {user.name.charAt(0)}
        </div>
        <span className="text-sm font-medium text-gray-800 max-w-[120px] truncate">{user.name}</span>
        <RiArrowDropDownLine size={20} className="text-gray-500" />
      </div>
    </Dropdown>
  );
};

const ProtectedPage = ({ children }) => {
  const [notifications = [], setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateToken = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetCurrentUser();
      dispatch(setLoader(false));
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        navigate("/Login");
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      navigate("/Login");
      message.error(error.message);
    }
  };

  const getNotifications = async () => {
    try {
      const response = await GetAllNotifications();
      if (response.success) {
        setNotifications(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const readNotifications = async () => {
    try {
      const response = await ReadAllNotifications();
      if (response.success) {
        getNotifications();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
      getNotifications();
    } else {
      navigate("/Login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const unreadCount = notifications?.filter((n) => !n.read).length;

  return (
    user && (
      <div>
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
          <div className="flex items-center justify-between h-16 px-6">
            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer select-none"
              onClick={() => navigate("/")}
            >
              <img src={Kinbechlogo} alt="Kinbech" className="w-9 h-9 object-contain" />
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                Kin<span className="text-[#14ae5c]">bech</span>
              </span>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Dashboard / My Listings */}
              <button
                onClick={() => navigate(user.role === "admin" ? "/admin" : "/SellerDashboard")}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-[#14ae5c] rounded-lg hover:bg-[#119e52] transition-colors"
              >
                <MdOutlineDashboard size={16} />
                {user.role === "admin" ? "Dashboard" : "My Listings"}
              </button>

              {/* Notifications bell */}
              <button
                className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
                onClick={() => {
                  readNotifications();
                  setShowNotifications(true);
                }}
                aria-label="Notifications"
              >
                <IoMdNotificationsOutline size={22} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>

              {/* User profile */}
              <UserProfileButton user={user} />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="max-w-7xl mx-auto px-6 py-6">
          {children}
        </main>

        <Notifications
          notifications={notifications}
          reloadNotifications={getNotifications}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
        />
      </div>
    )
  );
};

export default ProtectedPage;
