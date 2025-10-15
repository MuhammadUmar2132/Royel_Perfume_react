import React, { useState } from "react";
import axios from "axios";
import "./PurchasePage.css";

const PurchaseForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    province: "",
    district: "",
    postalCode: "",
    purchaseMethod: "Cash on Delivery",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8009/purchase", formData);
      alert("Purchase successful!");
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting purchase:", error);
      alert("Error submitting purchase");
    } finally {
      setIsLoading(false);
    }
  };

  const formatLabel = (key) => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  return (
    <div className="purchase-form-container">
      <h2 className="purchase-form-title">Complete Your Purchase</h2>

      <form onSubmit={handleSubmit}>
        {Object.keys(formData)
          .filter((key) => key !== "purchaseMethod")
          .map((key) => (
            <div key={key} className="form-group">
              <label className="form-label">{formatLabel(key)}</label>
              <input
                type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
                className="form-input"
                placeholder={`Enter your ${formatLabel(key).toLowerCase()}`}
              />
            </div>
          ))}

        <div className="form-group">
          <label className="form-label">Purchase Method</label>
          <select
            name="purchaseMethod"
            value={formData.purchaseMethod}
            onChange={handleChange}
            className="form-select"
          >
            <option value="Cash on Delivery">Cash on Delivery</option>
            <option value="Online Payment">Online Payment</option>
          </select>
        </div>

        <button 
          type="submit" 
          className={`submit-button ${isLoading ? 'loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? '' : 'Complete Purchase'}
        </button>
      </form>
    </div>
  );
};

export default PurchaseForm;