import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/detail.css";
import axios from "axios";

export default function Produit() {
  const { id } = useParams();
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    const list = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/product/${id}`
      );
      console.log(response);
      console.log(response.data);
      setBackendData(response.data);
    };
    list();
  }, []);

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
              <button>Ajouter au panier</button>
              <button>Réservé directement</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
