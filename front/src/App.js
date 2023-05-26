import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { userInfo } from "./utils";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home.js";
import Produits from "./pages/productsList.js";
import Produit from "./pages/detailProduct";
import Footer from "./components/footer";
import Header from "./components/header";
import Login from "./pages/login_signup";
import Dashboard from "./pages/adminDashboard";
import NewProduct from "./pages/AddProduct";
import EditProduct from "./pages/editProduct";
import Profile from "./pages/profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./pages/cart";

function App() {
  const [test, setTest] = useState(userInfo);
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" limit={1} />
      <Header test={test} setTest={setTest} />
      <main style={{ padding: 2 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setTest={setTest} />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute user={test}>
                <Profile setTest={setTest} />
              </ProtectedRoute>
            }
          />
          <Route path="/newProduct" element={
            <ProtectedRoute user={test}>
              <NewProduct />
            </ProtectedRoute>
          } />
          <Route path="/editProduct/:id" element={
            <ProtectedRoute user={test}>
              <EditProduct />
            </ProtectedRoute>
          } />
          <Route path="/products" element={<Produits />} />
          <Route path="/product/:id" element={<Produit />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute user={test}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
