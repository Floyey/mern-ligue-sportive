import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";

export default function Produits() {
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
      <h1>Produits</h1>
      <div>
        <div className="imgProduct">
          <img src="https://picsum.photos/200/300" alt="produit" />
        </div>
        <div>
          <div>
            <p>Produits page content</p>
          </div>
          <div>
            <p>Prix 400€</p>
            <p>Encore 10 en stock</p>
          </div>
        </div>
      </div>
    </div>
  );
}
