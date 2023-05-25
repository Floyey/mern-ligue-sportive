import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userInfo } from "../utils";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [length, setLenght] = useState(0);
  const navigate = useNavigate();
  const token = userInfo.data.token;

  useEffect(() => {
    const list = async () => {
      const items = JSON.parse(localStorage.getItem("cartItems")) || [];
      setCartItems(items);
      setLenght(items.length);
    };
    list();
  }, []);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productDetails = await Promise.all(
          cartItems.map(async (item) => {
            const response = await axios.get(
              `http://localhost:5000/api/product/${item.id}`
            );
            return {
              id: item.id,
              quantity: item.quantity,
              quantity_max: response.data.quantity,
              image: response.data.imgPrésentation,
              name: response.data.name
            };
          })
        );
        setCartItems(productDetails);
      } catch (error) {
        console.error(error);
      }
    };

    if (length > 0) {
      setLenght(length - 1);
      fetchProductDetails();
    }
  }, [cartItems, length]);

  const handleRemoveItem = (itemId) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: newQuantity
        };
      }
      return item;
    });
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const handleCheckout = () => {
    cartItems.map(async (item) => {
      const itemId = item.id;
      const itemQuantity = item.quantity;
      const itemQuantityMax = item.quantity_max;

      if (itemQuantity > itemQuantityMax) {
        return;
      }

      axios.put('http://localhost:5000/api/product/purchase', { id: itemId, quantity: itemQuantity }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
    });

    localStorage.removeItem('cartItems');

    navigate('/products');
  };

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <img src={item.image} alt={item.name} />
                <span>Product: {item.name}</span>
                <input
                  type="number"
                  min="1"
                  max={item.quantity_max}
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                />
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div>
            <Link to="/products"><button>Continuer mes achats</button></Link>
            <button onClick={handleCheckout}>Valider</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
