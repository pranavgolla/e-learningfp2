import { useData } from "../../Context";
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import Cookies from "js-cookie";
import Header from "../Header";
// import "./index.css";

const Cart = () => {
  const { cartList, setCartList } = useData();
  const [loading, setLoading] = useState(true);
  const quantities = {};
  const name = Cookies.get("user");
  let t = 0;
  for (let i of name) {
    if (i === "@") {
      break;
    }
    t = t + 1;
  }
  const name1 = name.slice(0, t);
  const user = name1;

  const increase = (id) => {
    const itemIndex = cartList.findIndex((item) => item._id === id);
    if (itemIndex !== -1) {
      const currentQuantity = cartList[itemIndex].quantity;
      const updatedCartList = [...cartList];
      updatedCartList[itemIndex].quantity = parseInt(currentQuantity) + 1;
      setCartList(updatedCartList);
    }
  };

  const decrease = (id) => {
    const itemIndex = cartList.findIndex((item) => item._id === id);
    if (itemIndex !== -1) {
      const currentQuantity = cartList[itemIndex].quantity;
      if (currentQuantity > 1) {
        const updatedCartList = [...cartList];
        updatedCartList[itemIndex].quantity = parseInt(currentQuantity) - 1;
        setCartList(updatedCartList);
      }
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const apiUrl = `http://localhost:4001/user/cartitemlist/${user}`;
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          setCartList(data);
          setLoading(false);
        } else {
          console.error("Failed to fetch product");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [user, setCartList]);

  const deleteItem = async (id) => {
    try {
      await fetch(`http://localhost:4001/user/deletecartitem/${user}/${id}`, {
        method: "DELETE",
      });
      setCartList((prevCartList) =>
        prevCartList.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const deleteAll = async () => {
    await fetch(`http://localhost:4001/user/deletecartlist/${user}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("CartList deleted:", data);
        setCartList([]);
      })
      .catch((error) =>
        console.error("Error deleting cartList from backend:", error)
      );
  };

  const totalAmount = cartList.reduce((total, product) => {
    const productQuantity =
      parseInt(product.quantity) + (quantities[product._id] || 0);
    const subtotal = parseInt(product.price) * productQuantity;
    return total + subtotal;
  }, 0);

  const saveAll = async () => {
    await fetch(`http://localhost:4001/user/deletecartlist/${user}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) =>
        console.error("Error deleting cartList from backend:", error)
      );

    const fb = { ...cartList };
    const sendRequest = async (data) => {
      try {
        const response = await fetch(
          "http://localhost:4001/user/create-cart-items",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const responseData = await response.json();
        console.log("CartList sent to backend:", responseData);
      } catch (error) {
        console.error("Error sending cartList to backend:", error);
      }
    };

    const fbValues = Object.values(fb);
    fbValues.forEach((element) => {
      sendRequest(element);
    });
  };

  return (
    <div className="cart-page">
      <Header className="cart-header"/>
      <h1 className="cart-title">Cart</h1>
      {loading ? (
        <div className="loading-indicator">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-actions">
            <button type="button" className="save-all-button" onClick={() => saveAll()}>
              Save All Items
            </button>
            <Link to="/products" className="nav-link save-all-button">Back to shop</Link>

            <button type="button" className="remove-all-button" onClick={() => deleteAll()}>
              Remove All Items
            </button>
          </div>
          <ul className="cart-list">
            {cartList.map((product) => (
              <li key={product._id} className="cart-item">
                <div className="cart-item-details">
                  <img
                    src={product.imageUrl}
                    alt="product"
                    className="cart-item-image"
                  />
                  <div className="cart-item-info">
                    <p className="cart-item-title">{product.title}</p>
                    <p className="cart-item-brand">by {product.brand}</p>
                  </div>
                </div>
                <div className="cart-item-quantity">
                  <button type="button" className="quantity-decrease" onClick={() => decrease(product._id)}>
                    -
                  </button>
                  <p className="quantity-display">
                    {parseInt(product.quantity) + (quantities[product._id] || 0)}
                  </p>
                  <button type="button" className="quantity-increase" onClick={() => increase(product._id)}>
                    +
                  </button>
                </div>
                <div className="cart-item-actions">
                  <p className="cart-item-price">
                    Rs{" "}
                    {parseInt(product.price) *
                      (parseInt(product.quantity) + (quantities[product._id] || 0))}
                  </p>
                  <button
                    type="button"
                    className="remove-item-button"
                    onClick={() => deleteItem(product._id)}
                  >
                    X
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {cartList.length > 0 && (
            <div className="cart-summary">
              <p className="order-total">Order Total: Rs {totalAmount}</p>
              <p className="item-count">{cartList.length} Items in Cart</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
