import React, { useEffect, useState } from "react";
import "../styles/detail.css";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "../styles/list.css";

export default function Produits() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    const list = async () => {
      const response = await axios.get("http://localhost:5000/api/product");
      console.log(response);
      setBackendData(response.data);
    };
    list();
  }, []);

  console.log(backendData);
  return (
    <div>
      <h1>Produits</h1>
      <div className="listProduct">
        {backendData.map((product, i) => {
          return (
            <>
              <Link to={`/product/${product._id}`}>
                <ProductCard product={product} key={i} />
              </Link>
            </>
          );
        })}
      </div>
    </div>
  );
}
