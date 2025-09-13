import React from "react";
import "./PrivacySetting.css";

const PrivacySetting = () => {
  return (
    <div className="settings-box">
      <h2>Privacy & Security</h2>
      <p>Secure your account</p>
      <div className="settings-options">
        <a href="/security">Security</a>
        <a href="/2fa">Two-Factor Authentication (2FA)</a>
        <a href="/devices">Devices</a>
      </div>
    </div>
  );
};

export default PrivacySetting;
