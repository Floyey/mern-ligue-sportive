import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";

export default function Produit() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    const list = async () => {
      const response = await fetch("http://localhost:3000/api/product");
      console.log(response);
      setBackendData(response.data);
    };
    list();
  }, []);

  return (
    <div>
      <h1>Produit</h1>
      <p>Produit page content</p>
    </div>
  );
}
