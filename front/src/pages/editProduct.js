import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getErrorFromBackend } from "./../utils";
import "../styles/detail.css";

export default function EditProduct() {
  const { id } = useParams();
  const [backendData, setBackendData] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
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

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setBackendData((values) => ({ ...values, [name]: value }));
  };

  const update = async (e) => {
    e.preventDefault();
    try {
      axios.put(`http://localhost:5000/api/product/${id}`, backendData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/products");
    } catch (error) {
      toast.error(getErrorFromBackend(error));
    }
  };

  return (
    <div>
      <h1>Modification du produit</h1>
      <div className="formProduct">
        <Form onSubmit={update}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nom du Produit</Form.Label>
            <Form.Control
              value={backendData.name}
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
              value={backendData.imgPrésentation}
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
              value={backendData.img}
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
                value={backendData.year}
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
                value={backendData.price}
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
                value={backendData.quantity}
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
              value={backendData.description}
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
