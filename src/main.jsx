import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// >customer
import Account from "./pages/customer/Account";
import Cart from "./pages/customer/Cart";
import Categories from "./pages/customer/Categories";
import Customer from "./pages/customer/Customer";
import Favorite from "./pages/customer/Favorite";
import Home from "./pages/customer/Home";
import Meals from "./pages/customer/Meals";
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

// >other
import NotFound404 from "./pages/other/NotFound404";

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
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
