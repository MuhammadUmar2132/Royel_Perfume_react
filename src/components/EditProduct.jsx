import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditProduct.css";

const EditProduct = () => {
  const { id } = useParams(); // This is productId from URL
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productId: "",
    productName: "",
    productDescription: "",
    productPrice: "",
    productImageUrl: "",
  });

  const [file, setFile] = useState(null); // ✅ New: File state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch product by productId
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8009/product/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // ✅ Update product by productId
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("productName", product.productName);
      formData.append("productDescription", product.productDescription);
      formData.append("productPrice", product.productPrice);
      if (file) formData.append("file", file); // ✅ Attach selected image file

      await axios.put(
        `http://localhost:8009/product/${product.productId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("✅ Product updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error updating product:", err);
      alert("❌ Failed to update product. Check console for details.");
    }
  };

  if (loading) return <p className="loading">Loading product details...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="edit-product-container">
      <h2>Edit Product</h2>

      <form onSubmit={handleSubmit} className="edit-product-form" encType="multipart/form-data">
        <div className="form-group">
          <label>Product ID</label>
          <input type="text" name="productId" value={product.productId} disabled />
        </div>

        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="productName"
            value={product.productName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="productDescription"
            value={product.productDescription}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>

        <div className="form-group">
          <label>Price ($)</label>
          <input
            type="number"
            name="productPrice"
            value={product.productPrice}
            onChange={handleChange}
            required
          />
        </div>

        {/* ✅ New File Upload Section */}
        <div className="form-group">
          <label>Change Product Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        {product.productImageUrl && (
          <div className="image-preview">
            <p>Current Image:</p>
            <img
              src={product.productImageUrl}
              alt={product.productName}
              style={{
                width: "150px",
                borderRadius: "8px",
                marginTop: "10px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        )}

        <button type="submit" className="update-btn">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
