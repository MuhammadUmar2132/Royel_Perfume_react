import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cartPage.css";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // ✅ Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // ✅ Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.productPrice * item.quantity,
    0
  );

  // ✅ Remove an item from cart
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.productId !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  // ✅ Clear the cart
  const clearCart = () => {
    localStorage.removeItem("cart");
    setCartItems([]);
  };

  // ✅ Handle checkout navigation
  const handleCheckout = () => {
    navigate("/purchase"); // 👈 redirects to purchase page
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img
                  src={item.productImageUrl}
                  alt={item.productName}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <h3>{item.productName}</h3>
                  <p>{item.productDescription}</p>
                  <p>Price: ${item.productPrice}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Total: ${(item.productPrice * item.quantity).toFixed(2)}</p>
                </div>
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item.productId)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: ${totalPrice.toFixed(2)}</h3>

            <div className="cart-buttons">
              <button className="clear-button" onClick={clearCart}>
                Clear Cart
              </button>
              <button className="checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
