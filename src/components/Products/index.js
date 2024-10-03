import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../Context";
// import "./index.css";
import Header from "../Header";

const categoryOptions = [
  { name: "Clothing", categoryId: "1" },
  { name: "Electronics", categoryId: "2" },
  { name: "Appliances", categoryId: "3" },
  { name: "Grocery", categoryId: "4" },
  { name: "Toys", categoryId: "5" },
];

const sortbyOptions = [
  { optionId: "-1", displayText: "Price (High-Low)" },
  { optionId: "1", displayText: "Price (Low-High)" },
];

const ratingsList = [
  { ratingId: "5", stars: "⭐⭐⭐⭐⭐" },
  { ratingId: "4", stars: "⭐⭐⭐⭐" },
  { ratingId: "3", stars: "⭐⭐⭐" },
  { ratingId: "2", stars: "⭐⭐" },
  { ratingId: "1", stars: "⭐" },
];

const ProductList = () => {
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [activeOptionId, setActiveOptionId] = useState("-1");
  const [activeCategoryId, setActiveCategoryId] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [activeRatingId, setActiveRatingId] = useState("");
  const { products, setProducts } = useData();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const apiUrl = `http://localhost:4001/user/fetch-allproducts?sort_by=${activeOptionId}&owner=${""}&category=${activeCategoryId}&title_search=${searchInput}&rating=${activeRatingId}`;
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Set loading to false when fetching completes
      }
    };

    fetchProducts();
  }, [activeOptionId, activeCategoryId, searchInput, activeRatingId, setProducts]);

  const handleSortByChange = (sortOption) => {
    setActiveOptionId(sortOption);
  };

  const handleCategoryChange = (category) => {
    setActiveCategoryId(category);
  };

  const handleSearchInputChange = (input) => {
    setSearchInput(input);
  };

  const handleRatingChange = (rating) => {
    setActiveRatingId(rating);
  };

  return (
    <div className="product-list-container">
      <Header />
      <div className="filter-section">
        {/* Search Input */}
        <input
          type="text"
          className="search-input"
          value={searchInput}
          onChange={(e) => handleSearchInputChange(e.target.value)}
          placeholder="Search..."
        />
        

        {/* Category Options */}
        <select
          className="filter-select"
          value={activeCategoryId}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">Category</option>
          {categoryOptions.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.name}
            </option>
          ))}
        </select>

        

        {/* Rating Options */}
        <select
          className="filter-select"
          value={activeRatingId}
          onChange={(e) => handleRatingChange(e.target.value)}
        >
          <option value="">Rating</option>
          {ratingsList.map((rating) => (
            <option key={rating.ratingId} value={rating.ratingId}>
              {rating.stars}
            </option>
          ))}
        </select>

        {/* Sorting Options */}
        <select
          className="filter-select"
          value={activeOptionId}
          onChange={(e) => handleSortByChange(e.target.value)}
        >
          <option value="">Sort By</option>
          {sortbyOptions.map((option) => (
            <option key={option.optionId} value={option.optionId}>
              {option.displayText}
            </option>
          ))}
        </select>
      </div>

      {/* Show loading indicator if loading is true */}
      {loading ? (
        <div className="loading-indicator">
          <p>Loading...</p>
        </div>
      ) : (
        // Product List
        <ul className="product-list">
          {products.map((product) => (
            <li className="product-item" key={product._id}>
              <Link to={`/products/${product._id}`} className="product-link">
              <div style={{width:"100%"}}>
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="product-image1"
                />
                </div>
                <div className="product-content">
                  <h2 className="product-title">{product.title}</h2>
                  <p className="product-brand">by {product.brand}</p>
                  <div className="product-details">
                    <p className="product-price">Rs {product.price}/-</p>
                    <div className="product-rating">
                      <span className="rating-stars">{'⭐'.repeat(product.rating)}</span>
                      <p>{product.rating}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
