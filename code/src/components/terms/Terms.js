import React from 'react';
import './Terms.css'; // We will create this CSS file next

const Terms = () => {
  return (
    <div className="terms-container">
      <div className="terms-content">
        <h1>Terms and Conditions</h1>
        <p className="last-updated">Last updated: [Date]</p>

        <h2>1. Introduction</h2>
        <p>Welcome to Bookify ("we", "us", "our"). These Terms and Conditions govern your use of our website and services, which provide a marketplace for buying and selling new and used books (the "Service").</p>
        
        <h2>2. User Accounts</h2>
        <p>To access certain features, you must register for an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate. You are responsible for safeguarding your password and for all activities that occur under your account.</p>
        
        <h2>3. User Conduct</h2>
        <p>You agree not to use the Service for any unlawful purpose or in any way that interrupts, damages, or impairs the service. You are solely responsible for all content (such as book listings, descriptions, and messages) that you upload, post, or otherwise transmit via the Service.</p>
        
        <h2>4. Seller Responsibilities</h2>
        <p>As a seller, you must provide accurate and complete descriptions of the books you list. You agree to ship books promptly upon receiving an order and to handle any disputes or returns in good faith. Bookify is a marketplace and is not responsible for the items sold, their condition, or their delivery.</p>

        <h2>5. Buyer Responsibilities</h2>
        <p>As a buyer, you are responsible for reading the full item description before making a purchase. When you commit to buy an item, you enter into a legally binding contract with the seller.</p>
        
        <h2>6. Limitation of Liability</h2>
        <p>Bookify is not liable for any indirect, incidental, special, or consequential damages, including loss of profits, data, or goodwill, arising out of your use of the Service or your inability to use the Service.</p>
        
        <h2>7. Governing Law</h2>
        <p>These Terms shall be governed by and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.</p>
        
        <h2>8. Changes to Terms</h2>
        <p>We reserve the right to modify these Terms at any time. We will provide notice of changes by posting the new Terms on this page. Your continued use of the Service after such changes constitutes your acceptance of the new Terms.</p>
      </div>
    </div>
  );
};

export default Terms;
