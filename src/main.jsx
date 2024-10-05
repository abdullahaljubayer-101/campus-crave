import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

// >customer
import Account from "./pages/customer/Account";
import Cart from "./pages/customer/Cart";
import Categories from "./pages/customer/Categories";
import Customer from "./pages/customer/Customer";
import Favorite from "./pages/customer/Favorite";
import Home from "./pages/customer/Home";
import Meals from "./pages/customer/Meals";
import Order from "./pages/customer/Order";
import Vendors from "./pages/customer/Vendors";

// >vendor
import AccountV from "./pages/vendor/Account";
import DashboardV from "./pages/vendor/Dashboard";
import OrderV from "./pages/vendor/Order";
import ProductV from "./pages/vendor/Product";
import ReviewV from "./pages/vendor/Review";
import Vendor from "./pages/vendor/Vendor";

// >admin
import AccountA from "./pages/admin/Account";
import Admin from "./pages/admin/Admin";
import CustomerA from "./pages/admin/Customer";
import DashboardA from "./pages/admin/Dashboard";
import LoanA from "./pages/admin/Loan";
import OrderA from "./pages/admin/Order";
import ProductA from "./pages/admin/Product";
import ReviewA from "./pages/admin/Review";
import VendorA from "./pages/admin/Vendor";
import VendorDetailsA from "./pages/admin/VendorDetails";

// >auth
import ConfirmEmail from "./pages/auth/forgot-password/ConfirmEmail";
import ConfirmOTP from "./pages/auth/forgot-password/ConfirmOTP";
import ForgotPassword from "./pages/auth/forgot-password/ForgotPassword";
import ResetPassword from "./pages/auth/forgot-password/ResetPassword";
import Register from "./pages/auth/register/Register";
import CustomerR from "./pages/auth/register/customer/Customer";
import EmailVerificationC from "./pages/auth/register/customer/EmailVerification";
import VendorR from "./pages/auth/register/vendor/Vendor";
import EmailVerificationV from "./pages/auth/register/vendor/EmailVerification";
import Auth from "./pages/auth/Auth";
import Login from "./pages/auth/Login";
import Logout from "./pages/auth/Logout";

// >other
import NotFound404 from "./pages/other/NotFound404";
import TermsAndConditions from "./pages/other/TermsAndConditions";

const router = createBrowserRouter([
  // >customer
  {
    path: "/",
    element: <Customer />,
    errorElement: <NotFound404 />,
    children: [
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/favorite",
        element: <Favorite />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/meals",
        element: <Meals />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/vendors",
        element: <Vendors />,
      },
    ],
  },
  // >vendor
  {
    path: "/vendor",
    element: <Vendor />,
    children: [
      {
        path: "/vendor/account",
        element: <AccountV />,
      },
      {
        path: "/vendor",
        element: <DashboardV />,
      },
      {
        path: "/vendor/order",
        element: <OrderV />,
      },
      {
        path: "/vendor/product",
        element: <ProductV />,
      },
      {
        path: "/vendor/review",
        element: <ReviewV />,
      },
    ],
  },
  // >admin
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "/admin/account",
        element: <AccountA />,
      },
      {
        path: "/admin/customer",
        element: <CustomerA />,
      },
      {
        path: "/admin",
        element: <DashboardA />,
      },
      {
        path: "/admin/loan",
        element: <LoanA />,
      },
      {
        path: "/admin/order",
        element: <OrderA />,
      },
      {
        path: "/admin/product",
        element: <ProductA />,
      },
      {
        path: "/admin/review",
        element: <ReviewA />,
      },
      {
        path: "/admin/vendor",
        element: <VendorA />,
      },
      {
        path: "/admin/vendor/:id",
        element: <VendorDetailsA />,
      },
    ],
  },
  // >auth
  {
    path: "/auth",
    element: <Auth />,
    children: [
      // >forgot password
      {
        path: "/auth/forgot-password",
        element: <ForgotPassword />,
        children: [
          {
            path: "/auth/forgot-password/confirm-email",
            element: <ConfirmEmail />,
          },
          {
            path: "/auth/forgot-password/confirm-otp",
            element: <ConfirmOTP />,
          },
          {
            path: "/auth/forgot-password/reset-password",
            element: <ResetPassword />,
          },
        ],
      },
      // >register
      {
        path: "/auth/register",
        element: <Register />,
        children: [
          // >customer register
          {
            path: "/auth/register/customer",
            element: <CustomerR />,
          },
          {
            path: "/auth/register/customer/email-verification",
            element: <EmailVerificationC />,
          },
          // >vendor register
          {
            path: "/auth/register/vendor",
            element: <VendorR />,
          },
          {
            path: "/auth/register/vendor/email-verification",
            element: <EmailVerificationV />,
          },
        ],
      },
      // >login
      {
        path: "/auth/login",
        element: <Login />,
      },
      // >logout
      {
        path: "/auth/logout",
        element: <Logout />,
      },
    ],
  },
  // >terms and conditions
  {
    path: "/terms-and-conditions",
    element: <TermsAndConditions />,
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>
);
