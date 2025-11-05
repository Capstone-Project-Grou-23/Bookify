import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is currently empty.</p>
          <Link to="/buy" className="btn-shop">Start Shopping</Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <div className="cart-item" key={item.id}>
                <img src={item.image_url || 'https://via.placeholder.com/150'} alt={item.title} />
                <div className="item-details">
                  <h2 className="item-title">{item.title}</h2>
                  <p className="item-author">by {item.author}</p>
                  <p className="item-price">${parseFloat(item.price).toFixed(2)}</p>
                </div>
                <div className="item-actions">
                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button className="btn-remove" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${getCartTotal()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>${getCartTotal()}</span>
            </div>
            <button className="btn-checkout">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
