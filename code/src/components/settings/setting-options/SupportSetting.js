import React from "react";
import "./SupportSetting.css";
import Help from "./support-options/Help";
import Contact from "./support-options/Contact";
import About from "./support-options/About";


const SupportSetting = () => {
  return (
    <div className="settings-box">
      <h2>Need Help?</h2>
      <p>Select an option below</p>
      <div className="settings-options">
        <a href="/help">Help</a>
        <a href="/contact">Contact</a>
        <a href="/about">About</a>
      </div>
    </div>
  );
};

export default SupportSetting;
