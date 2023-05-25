import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home.js";
import Produits from "./pages/listeProduits.js";
import Footer from "./components/footer";
import Header from "./components/header";
import Login from "./pages/login_signup";

function App() {
  return (
    <BrowserRouter>
      <header>
        <Header />
      </header>
      <main style={{ padding: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produits" element={<Produits />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
