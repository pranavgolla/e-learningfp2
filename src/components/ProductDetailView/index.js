import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import { useData } from "../../Context";
import Cookies from "js-cookie";
// import "./index.css";

const ProductItemDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { cartList, setCartList } = useData();
  const [quantity, setQuantity] = useState(1);

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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const apiUrl = `http://localhost:4001/user/products/${id}`;
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          console.error("Failed to fetch product");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const addCartItem = async () => {
    await fetch(`http://localhost:4001/user/deletecartlist/${user}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("CartList deleted:", data);
      })
      .catch((error) =>
        console.error("Error deleting cartList from backend:", error)
      );

    let fb = [];
    const productWithQuantity = { ...product, quantity: quantity, user: user };
    const existingProductIndex = cartList.findIndex(
      (item) => item._id === product._id
    );
    if (existingProductIndex !== -1) {
      cartList[existingProductIndex].quantity =
        parseInt(productWithQuantity.quantity) +
        parseInt(cartList[existingProductIndex].quantity);
      await setCartList([...cartList]);
      const updatedCartList = [...cartList];
      fb = { ...updatedCartList };
    } else {
      await setCartList([productWithQuantity, ...cartList]);
      const updatedCartList = [...cartList, productWithQuantity];
      fb = { ...updatedCartList };
    }

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

  const increase = () => {
    setQuantity(quantity + 1);
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }
  };

  return (
    <>
      <Header className="header" />
      <div className="product-details-container">
        <div className="product-details" >
          <img src={product.imageUrl} alt="product" className="product-image" />
          <div className="product-details-info" >
            <h1 className="product-title">{product.title}</h1>
            <p className="product-brand">by {product.brand}</p>
            <p className="product-price">Rs {product.price}/-</p>
            <p className="product-rating">{product.rating} ⭐</p>
            <div className="quantity-selector">
              <button type="button" onClick={decrease}>
                -
              </button>
              <p>{quantity}</p>
              <button type="button" onClick={increase}>
                +
              </button>
            </div>
            <button
              type="button"
              className="add-to-cart-button"
              onClick={() => addCartItem()}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItemDetails;
