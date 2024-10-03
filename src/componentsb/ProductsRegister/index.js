import React, { useState } from "react";
import ProductListb from "../Productsb";
import { useData } from "../../Context";
import Cookies from "js-cookie";

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

const ProductForm = () => {
  const [imageUrlError, setImageUrlError] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const {
    imageUrl,
    setImageUrl,
    title,
    setTitle,
    brand,
    setBrand,
    price,
    task,
    setTask,
  } = useData();

  const [shouldUpdateProducts, setShouldUpdateProducts] = useState(false);

  const updateProducts = () => setShouldUpdateProducts((prev) => !prev);

  const name = Cookies.get("owner");
  const owner = name.split("@")[0]; // Extract name before @

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValidUrl(imageUrl)) {
      setImageUrlError("Please enter a valid URL");
      return;
    }

    const product = {
      imageUrl,
      title,
      brand,
      owner,
      rating: selectedSubject, // Store subject as rating
      price,
      category: selectedClass, // Store class
    };

    fetch("http://localhost:4001/admin/register-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (response.ok) {
          resetForm();
          updateProducts();
          setTask("Add");
        } else {
          console.error("Failed to add product");
        }
      })
      .catch((error) => console.error("Error adding product:", error));
  };

  const resetForm = () => {
    setImageUrl("");
    setTitle("");
    setBrand("");
    setSelectedSubject("");
    setSelectedClass("");
    setImageUrlError("");
  };

  const handleImageUrlChange = (event) => {
    const value = event.target.value;
    setImageUrl(value);
    setImageUrlError(isValidUrl(value) ? "" : "Please enter a valid URL");
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f0f0", borderRadius: "8px",display:"flex",width:"100%",justifyContent:"space-around",height:"100vh" }}>
      <div style={{ marginBottom: "20px" }}>
        <h2>{task} Class videos</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="imageUrl" style={{ display: "block", marginBottom: "5px" }}>Video URL:</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={handleImageUrlChange}
            style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          {imageUrlError && <span style={{ color: "red" }}>{imageUrlError}</span>}
          
          <label htmlFor="subject" style={{ display: "block", marginBottom: "5px" }}>Subject:</label>
          <select
            id="subject"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
          >
            <option value="">Select Subject</option>
            {ratingsList.map((option) => (
              <option key={option.ratingId} value={option.stars}>
                {option.stars}
              </option>
            ))}
          </select>

          <label htmlFor="brand" style={{ display: "block", marginBottom: "5px" }}>Topic:</label>
          <input
            type="text"
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
          />

          <label>Teacher Name: {owner}</label>

          <label htmlFor="class" style={{ display: "block", marginBottom: "5px" }}>Class:</label>
          <select
            id="class"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
          >
            <option value="">Select Class</option>
            {categoryOptions.map((option) => (
              <option key={option.categoryId} value={option.categoryId}>
                {option.name}
              </option>
            ))}
          </select>

          <div style={{ display: "flex", gap: "10px" }}>
            <button type="submit" style={{ padding: "10px 20px", borderRadius: "4px", border: "none", backgroundColor: "#28a745", color: "white" }}>
              {task === "Add" ? "Submit" : "Update"}
            </button>
            {task === "Update" && (
              <button type="button" onClick={resetForm} style={{ padding: "10px 20px", borderRadius: "4px", border: "none", backgroundColor: "#007bff", color: "white" }}>
                Add New
              </button>
            )}
          </div>
        </form>
      </div>
      <div>
        <ProductListb shouldUpdateProducts={shouldUpdateProducts} />
      </div>
    </div>
  );
};

export default ProductForm;
