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
      <h1>Produits</h1>
      <div className="contentProduct">
        <div className="imgProduct">
          <img src="https://picsum.photos/200/300" alt="produit" />
        </div>
        <div className="infoProduct">
          <div className="descriptionProduct">
            <p>Produits page content</p>
            <p>Description</p>
            <p>
              Descouvre que la réalité n’est qu’une immense simulation créée par
              la Matrice, réduisant l’espèce humaine en esclavage. Pour
              Morpheus, Neo est «?l’élu?», capable de mettre en échec la M
            </p>
          </div>
          <div className="orderProduct">
            <h2>Prix 400€</h2>
            <p>Encore 10 en stock</p>
            <p>A reccupéré à l'espace Joly</p>
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
