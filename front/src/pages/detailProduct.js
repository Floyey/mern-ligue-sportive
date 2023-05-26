import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { userInfo } from "../utils";
import "../styles/detail.css";

export default function Produit() {
  const { id } = useParams();
  const [backendData, setBackendData] = useState([{}]);
  const [quantity, setQuantity] = useState(1);
  const token = userInfo.data.token;
  const navigate = useNavigate();

  useEffect(() => {
    const list = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/product/${id}`
      );
      setBackendData(response.data);
    };
    list();
  }, [id]);

  const handleQuantityChange = (event) => {
    if (event.target.value === "") {
      return;
    }
    const value = parseInt(event.target.value, 10);
    setQuantity(value);
  };

  const addToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === backendData._id
    );

    if (existingItemIndex !== -1) {
      if (
        cartItems[existingItemIndex].quantity + quantity >
        backendData.quantity
      ) {
        return;
      }
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      if (quantity > backendData.quantity) {
        return;
      }
      cartItems.push({
        id: backendData._id,
        quantity: quantity,
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const instantPurchase = () => {
    if (quantity > backendData.quantity) {
      return;
    }

    axios
      .put(
        "http://localhost:5000/api/product/purchase",
        { id: backendData._id, quantity: quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        navigate("/products");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>{backendData.name}</h1>
      <div className="contentProduct">
        <div className="imgProduct">
          <img src={backendData.imgPrésentation} alt={backendData.name} />
        </div>
        <div className="infoProduct">
          <div className="descriptionProduct">
            <p>Produits page content</p>
            <p>Année: {backendData.year}</p>
            <p>Description: {backendData.description}</p>
          </div>
          <div className="orderProduct">
            <h2>Prix {backendData.price}</h2>
            <p>Encore {backendData.quantity} en stock</p>
            <p>A reccupérer à l'espace Joly</p>
            <div className="callToAction">
              <div>
                <label htmlFor="quantityInput">Quantité :</label>
                <input
                  type="number"
                  id="quantityInput"
                  min="1"
                  max={backendData.quantity}
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </div>
              <button onClick={addToCart}>Ajouter au panier</button>
              {!userInfo ? (
                <>
                  <Link to="/login">
                    <button>Réservé directement</button>
                  </Link>
                </>
              ) : (
                <>
                  <button onClick={instantPurchase}>Réservé directement</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
