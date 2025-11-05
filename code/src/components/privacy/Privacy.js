import React from 'react';
import './Privacy.css'; // We'll create this CSS file next

const Privacy = () => {
  return (
    <div className="privacy-container">
      <div className="privacy-content">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last updated: [Date]</p>

        <h2>1. Information We Collect</h2>
        <p>We collect information you provide directly to us when you create an account, list a book for sale, or communicate with us. This may include:</p>
        <ul>
          <li>Your name, email address, and password.</li>
          <li>Information about the books you list (title, author, condition, price).</li>
          <li>Communications between you and other users (buyers or sellers).</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide, maintain, and improve our Service.</li>
          <li>Process transactions and send you related information.</li>
          <li>Communicate with you about products, services, offers, and events.</li>
          <li>Monitor and analyze trends, usage, and activities in connection with our Service.</li>
        </ul>

        <h2>3. Sharing Your Information</h2>
        <p>We do not share your personal information with third parties except as described in this policy. We may share information with:</p>
        <ul>
          <li>Other users (e.g., we share your name with a buyer when you sell a book).</li>
          <li>Vendors and service providers who need access to such information to carry out work on our behalf.</li>
          <li>In response to a request for information if we believe disclosure is in accordance with any applicable law or legal process.</li>
        </ul>

        <h2>4. Cookies</h2>
        <p>We use cookies to help improve your experience on our website. Cookies are small data files stored on your hard drive or in device memory that help us improve our Service and your experience.</p>
        
        <h2>5. Changes to This Policy</h2>
        <p>We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the "Last Updated" date at the top of this policy and, in some cases, we may provide you with additional notice.</p>
      </div>
    </div>
  );
};

export default Privacy;
