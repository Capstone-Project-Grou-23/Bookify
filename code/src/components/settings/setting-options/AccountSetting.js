import React from "react";
import "./AccountSetting.css";

const AccountSetting = () => {
  return (
    <div className="settings-box">
      <h2>Account Settings</h2>
      <p>Manage your account</p>
      <div className="settings-options">
        <a href="/subscription">Subscription</a>
        <a href="/delete-account">Delete Account</a>
        <a href="/email-password">Email / Password</a>
      </div>
    </div>
  );
};

export default AccountSetting;
