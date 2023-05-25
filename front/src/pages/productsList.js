import React, { useEffect, useState } from "react";
import "../styles/detail.css";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "../styles/list.css";

export default function Produits() {
  const [backendData, setBackendData] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const list = async () => {
      const response = await axios.get("http://localhost:5000/api/product");
      console.log(response);
      setBackendData(response.data);
    };
    list();
  }, []);

  console.log(backendData);
  useEffect(() => {
    const filterProducts = () => {
      const filtered = backendData.filter((data) =>
        data.name.toLowerCase().includes(searchName.toLowerCase())
      );
      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [searchName, backendData]);

  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
  };

  console.log(backendData);
  return (
    <div>
      <div className="search-panel">
        <img src="loupe.png" alt="search" />
        <input
          type="text"
          placeholder="Rechercher le produit dont vous avez besoin"
          value={searchName}
          onChange={handleSearchNameChange}
        />
      </div>
      <h1>Produits</h1>
      <div className="listProduct">
        {filteredProducts.map((product, i) => {
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
