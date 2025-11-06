import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './FakeCheckout.css'; // We will create this
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faLock, faSpinner } from '@fortawesome/free-solid-svg-icons';

const FakeCheckout = () => {
    const { getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const total = getCartTotal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing time (e.g., 2 seconds)
        setTimeout(() => {
            // 1. Clear the cart
            clearCart();
            
            // 2. Show a success message (optional)
            // We can use the same "party-popup" style from signup
            const popup = document.createElement("div");
            popup.className = "party-popup"; // Uses styles from Login.css
            popup.innerHTML = `<h2>🎉 Payment Successful!</h2><p>Your order for $${total} is complete.</p>`;
            document.body.appendChild(popup);
            
            setTimeout(() => popup.classList.add("show"), 100);

            // 3. Redirect to homepage
            setTimeout(() => {
                popup.classList.remove("show");
                setTimeout(() => {
                    popup.remove();
                    navigate("/");
                }, 500);
            }, 3000); // Show popup for 3 seconds

        }, 2000); // 2-second processing delay
    };

    return (
        <div className="checkout-container">
            <div className="checkout-box">
                <div className="checkout-header">
                    <h2>Bookify Secure Checkout</h2>
                    <FontAwesomeIcon icon={faLock} />
                </div>
                <p>This is a simulated payment page. No real card will be charged.</p>
                
                <form id="payment-form" onSubmit={handleSubmit}>
                    <label htmlFor="card-number">Card Number</label>
                    <div className="input-icon">
                        <FontAwesomeIcon icon={faCreditCard} />
                        <input type="text" id="card-number" placeholder="4242 4242 4242 4242" required />
                    </div>

                    <label htmlFor="card-name">Name on Card</label>
                    <input type="text" id="card-name" placeholder="John M. Doe" required />

                    <div className="flex-row">
                        <div>
                            <label htmlFor="expiry">Expiry</label>
                            <input type="text" id="expiry" placeholder="MM / YY" required />
                        </div>
                        <div>
                            <label htmlFor="cvc">CVC</label>
                            <input type="text" id="cvc" placeholder="123" required />
                        </div>
                    </div>

                    <button disabled={isProcessing} type="submit" className="pay-button">
                        {isProcessing ? (
                            <FontAwesomeIcon icon={faSpinner} spin />
                        ) : (
                            `Pay $${total}`
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FakeCheckout;
