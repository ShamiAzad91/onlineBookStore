import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/nav/Menu";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/routes/PrivateRoute";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminRoute from "./components/routes/AdminRoute";
import AdminCategory from "./pages/admin/Category";
import AdminProduct from "./pages/admin/Product";
import UserProfile from "./pages/user/Profile";
import UserOrders from "./pages/user/Orders";
import AdminProducts from "./pages/admin/Products";
import AdminProductUpdate from "./pages/admin/ProductUpdate";
import Shop from "./pages/Shop";
import Search from "./pages/Search";
import ProductView from "./pages/ProductView";
import CategoriesList from "./pages/CategoriesList";
import CategoryView from "./pages/CategoryView";
import Cart from "./pages/Cart";
import AdminOrders from "./pages/admin/Order";


const PageNotFound = () => {
  return (
    <div className="d-flex justify-content-center align-item-center vh-100">
      404 | page not found
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:slug" element={<ProductView />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/categories" element={<CategoriesList />} />
        <Route path="/category/:slug" element={<CategoryView />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/orders" element={<UserOrders />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/category" element={<AdminCategory />} />
          <Route path="admin/product" element={<AdminProduct />} />
          <Route path="admin/products" element={<AdminProducts />} />
          <Route path="admin/orders" element={<AdminOrders />} />

          <Route
            path="admin/product/update/:slug"
            element={<AdminProductUpdate />}
          />
        </Route>

        <Route path="/*" element={<PageNotFound />} replace />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
