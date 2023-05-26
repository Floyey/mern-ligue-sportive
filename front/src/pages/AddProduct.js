import React, { useState } from "react";
import "../styles/detail.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { getErrorFromBackend } from "./../utils";
import { useNavigate } from "react-router-dom";

export default function NewProduct() {
  const [backendData, setBackendData] = useState([]);
  const navigate = useNavigate();
  const userInfo = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const token = userInfo[0].data.token;

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setBackendData((values) => ({ ...values, [name]: value }));
  };

  const create = async (e) => {
    const name = 'user_id';
    const userId = userInfo[0].data._id;
    setBackendData((values) => ({ ...values, [name]: userId }));
    e.preventDefault();
    try {
      axios.post(
        `http://localhost:5000/api/product`,
        backendData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then(response => {
          console.log(response);
          navigate("/products");
        })
        .catch(error => {
          console.error(error);
        });
    } catch (error) {
      toast.error(getErrorFromBackend(error));
    }
  };

  return (
    <div>
      <h1>Ajouter un nouveau produit</h1>
      <div className="formProduct">
        <Form onSubmit={create}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nom du Produit</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nom du produit"
              name="name"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Url de l'image principale</Form.Label>
            <Form.Control
              type="text"
              placeholder="Image"
              name="imgPrésentation"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Url des autre images</Form.Label>
            <Form.Control
              type="text"
              placeholder="Images"
              name="img"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Année du Produit</Form.Label>
              <Form.Control
                type="text"
                placeholder="Année d'achat"
                name="year"
                onChange={handleChange}
                required
              />
              <Form.Text className="text-muted">
                Depuis quand nous avons le produit
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Prix</Form.Label>
              <Form.Control
                type="text"
                placeholder="Année d'achat"
                name="price"
                onChange={handleChange}
                required
              />
              <Form.Text className="text-muted">Sous forme "**€"</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Quantité</Form.Label>
              <Form.Control
                type="Number"
                placeholder="Qantité"
                name="quantity"
                onChange={handleChange}
                required
              />
            </Form.Group>
          </div>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Description"
              name="description"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
