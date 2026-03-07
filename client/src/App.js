import React from "react";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import ProtectedPage from "./components/ProtectedPage";
import Spinner from "./components/Spinner";
import { useSelector } from "react-redux";
import SellerDashboard from "./pages/SellerDashboard/SellerDashboard";
import Admin from "./pages/Admin";
import ProductInfo from "./pages/ProductInfo";
import Home from "./pages/Home/Home";
import ForgotPassword from "./pages/ForgotPassword";
import OTPVerification from "./pages/OTPVerification";
import Myprofile from "./pages/Myprofile";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";


const App = () => {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <div>
      {loading && <Spinner />}
      <section>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedPage>
                <Home />
              </ProtectedPage>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedPage>
                <ProductInfo />
              </ProtectedPage>
            }
          />
          <Route
            path="/SellerDashboard"
            element={
              <ProtectedPage>
                <SellerDashboard />
              </ProtectedPage>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedPage>
                <Admin />
              </ProtectedPage>
            }
          />
          <Route
            path="/myprofile"
            element={
              <ProtectedPage>
                <Myprofile />
              </ProtectedPage>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/otpverification" element={<OTPVerification />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
        </Routes>
      </section>
      <Footer />
    </div>
  );
};

export default App;
