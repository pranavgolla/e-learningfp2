import React, { createContext, useContext, useState } from "react";

// Create a context
const DataContext = createContext();

// Create a provider component
export const DataProvider = ({ children }) => {
  const [data1, setData] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [task, setTask] = useState("Add");
  const [products, setProducts] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    setQuantity(quantity + 1);
  };

  // Function to decrease quantity
  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }
  };

  return (
    <DataContext.Provider
      value={{
        data1,
        setData,
        imageUrl,
        setImageUrl,
        title,
        setTitle,
        brand,
        setBrand,
        rating,
        setRating,
        price,
        setPrice,
        category,
        setCategory,
        task,
        setTask,
        products,
        setProducts,
        cartList,
        setCartList,
        quantity,
        setQuantity,
        increase,
        decrease,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the context
export const useData = () => useContext(DataContext);
