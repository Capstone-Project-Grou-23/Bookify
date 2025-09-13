import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="support-content">
      <h2>Contact Us</h2>
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" required />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" required />
        <label htmlFor="message">Message</label>
        <textarea id="message" rows="5" required></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Contact;
