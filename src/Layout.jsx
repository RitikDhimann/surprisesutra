import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MinimalNavbar from "./components/MinimalNavbar";
import HomePage from "./pages/Home";
import BetterFooter from "./components/BetterFooter";
import CustomCursor from "./components/CustomCursor";
// ... other imports

import ThemedPartySupplies from "./services/ThemedParty";
import CustomizedPartySupplies from "./services/Customized";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Gifts from "./pages/Gifts";
import ContactUs from "./pages/ContactUs";
import ProductList from "./pages/Products";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckOut";
import Login from "./pages/Login";
import ProfilePage from "./pages/Profile";
import MyOrdersPage from "./pages/MyOrders";
import ScrollToTop from "./components/ScrollToTop";
import ProductDetails from "./pages/ProductDetails";
import Register from "./pages/Register";
import WishlistPage from "./pages/Wishlist";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import RefundPolicy from "./pages/RefundPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import Faqs from "./pages/Faqs";
import Services from "./pages/Services";
import ForgotPassword from "./pages/ForgotPassword"
import AboutUs from "./pages/AboutUs";
import CollabPage from "./pages/Collab";
import BookNow from "./pages/BookNow";


function Layout() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-white font-brand antialiased">
        <CustomCursor />
        <MinimalNavbar />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable theme="colored" style={{ zIndex: 99999 }} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsConditions />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/faqs" element={<Faqs />} />;
            <Route path="/about" element={<AboutUs />} />
            <Route path="/collab" element={<CollabPage />} />

            <Route path="/gifts" element={<Gifts />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/my-orders" element={<MyOrdersPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/productdetails/:id" element={<ProductDetails />} />
            <Route path="/diy-kits" element={<ProductList />} />
            <Route path="/book-now" element={<BookNow />} />
            <Route
              path="/party-supplies/themed"
              element={<ThemedPartySupplies />}
            />

            <Route
              path="/party-supplies/customized"
              element={<CustomizedPartySupplies />}
            />
          </Routes>
        </main>
        <BetterFooter />
      </div>
    </Router>


  );
}

export default Layout;
