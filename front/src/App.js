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

function App() {
  const [test, setTest] = useState(userInfo);
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Header test={test} setTest={setTest} />
      </header>
      <main style={{ padding: 2 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setTest={setTest} />} />
          <Route path="/products" element={<Produits />} />
          <Route path="/product/:id" element={<Produit />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
