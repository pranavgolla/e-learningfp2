import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { useData } from "../../Context";
import Header from "./Header";

const categoryOptions = [
  { name: "1st Class", categoryId: "1" },
  { name: "2nd Class", categoryId: "2" },
  { name: "3rd Class", categoryId: "3" },
  { name: "4th Class", categoryId: "4" },
  { name: "5th Class", categoryId: "5" },
  { name: "6th Class", categoryId: "6" },
  { name: "7th Class", categoryId: "7" },
  { name: "8th Class", categoryId: "8" },
  { name: "9th Class", categoryId: "9" },
  { name: "10th Class", categoryId: "10" },
];

const ratingsList = [
  { stars: "Telugu", ratingId: "1" },
  { stars: "English", ratingId: "2" },
  { stars: "Hindi", ratingId: "3" },
  { stars: "Mathematics", ratingId: "4" },
  { stars: "Science", ratingId: "5" },
  { stars: "Social", ratingId: "6" },
];

const Classes = ({ shouldUpdateProducts }) => {
  const [products, setProducts] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [activeRatingId, setActiveRatingId] = useState("");
  const videoRefs = useRef([]);

  const name = Cookies.get("owner");
  const {
    setCategory,
    setPrice,
    setRating,
    setBrand,
    setTitle,
    setImageUrl,
    setTask,
  } = useData();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const t = name.indexOf("@");
        const name1 = name.slice(0, t);
        const apiUrl = `http://localhost:4001/user/fetch-allproducts?owner=${name1}&category=${activeCategoryId}&title_search=${searchInput}&rating=${activeRatingId}`;
        const response = await fetch(apiUrl);

        if (response.ok) {
          const data = await response.json();
          setProducts(data);
          console.log(data);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [
    activeCategoryId,
    searchInput,
    activeRatingId,
    name,
    shouldUpdateProducts,
  ]);

  const handleCategoryChange = (category) => {
    setActiveCategoryId(category);
  };

  const handleSearchInputChange = (input) => {
    setSearchInput(input);
  };

  const handleRatingChange = (rating) => {
    setActiveRatingId(rating);
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:4001/user/delete-product/${productId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setProducts(products.filter((product) => product._id !== productId));
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdate = (productId) => {
    const productToUpdate = products.find(
      (product) => product._id === productId
    );

    if (productToUpdate) {
      setCategory(productToUpdate.category);
      setPrice(productToUpdate.price);
      setRating(productToUpdate.rating);
      setBrand(productToUpdate.brand);
      setTitle(productToUpdate.title);
      setImageUrl(productToUpdate.imageUrl);
      setTask("Update");
    } else {
      console.error("Product not found");
    }
  };

  const handlePlayPause = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      if (video.paused) {
        // Pause all other videos
        videoRefs.current.forEach((v, i) => {
          if (i !== index && !v.paused) {
            v.pause();
          }
        });
        video.play().catch((error) => {
          console.error("Failed to play video:", error);
        });
      } else {
        video.pause();
      }
    }
  };
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#F9F9F9",
    minHeight: "100vh",
    margin:"0px"
  };

  return (
    <div style={containerStyle}>
    {/* <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}> */}
      <Header />
      <div
        className="fsb1"
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "20px",
          gap: "10px",
          marginTop:"10px"
        }}
      >
        {/* Category Options */}
        <select
          value={activeCategoryId}
          onChange={(e) => handleCategoryChange(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">Category</option>
          {categoryOptions.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Search Input */}
        <input
          type="text"
          value={searchInput}
          onChange={(e) => handleSearchInputChange(e.target.value)}
          placeholder="Search..."
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "200px",
            // marginRight: "20px",
          }}
        />

        {/* Rating Options */}
        <select
          value={activeRatingId}
          onChange={(e) => handleRatingChange(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">Subject</option>
          {ratingsList.map((rating) => (
            <option key={rating.ratingId} value={rating.ratingId}>
              {rating.stars}
            </option>
          ))}
        </select>
      </div>

      {/* Product List */}
      <ul className="ul" style={{ listStyleType: "none", padding: "0", display:"flex",gap:"10px" }}>
        {products.map((product, index) => (
          <li
            className="product-item"
            key={product._id}
            style={{
              marginBottom: "20px",
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <div>
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                width="100px"
                height="100px"
                controls={false}
                style={{ borderRadius: "5px", marginBottom: "10px" }}
                src={`https://www.youtube.com/embed/${
                  product.imageUrl.split("v=")[1]
                }`}
              />
              <button
                onClick={() => handlePlayPause(index)}
                style={{
                  padding: "5px 10px",
                  border: "none",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginBottom: "10px",
                }}
              >
                {videoRefs.current[index] && videoRefs.current[index].paused
                  ? "Play"
                  : "Pause"}
              </button>
              <h1 className="title" style={{ fontSize: "1.2rem", margin: "0" }}>
                {product.title}
              </h1>
              <p className="brand" style={{ margin: "5px 0" }}>
                Topic: {product.brand}
              </p>
              <div
                className="product-details"
                style={{ display: "flex", alignItems: "center" }}
              >
                <div
                  className="rating-container"
                  style={{ marginRight: "10px" }}
                >
                  <p className="rating" style={{ margin: "0" }}>
                    {product.rating}
                  </p>
                </div>
              </div>
            </div>
            <div
              className="b2"
              style={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button
                onClick={() => handleDelete(product._id)}
                style={{
                  padding: "5px 10px",
                  border: "none",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
              <button
                onClick={() => handleUpdate(product._id)}
                style={{
                  padding: "5px 10px",
                  border: "none",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Update
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    // </div>
  );
};

export default Classes;
