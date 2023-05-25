import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home.js";
import Produits from "./pages/productsList.js";
import Produit from "./pages/detailProduct";
import Footer from "./components/footer";
import Header from "./components/header";
import Login from "./pages/login_signup";
import { useState } from "react";
import { userInfo } from "./utils";

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
          <Route path="/produits" element={<Produits />} />
          <Route path="/produits/:id" element={<Produit />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
