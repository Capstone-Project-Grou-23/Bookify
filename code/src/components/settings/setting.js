import React, { useState } from "react";
import "./Setting.css";

// Import your setting option components
import ProfileSettings from "./setting-options/ProfileSettings";
import AccountSettings from "./setting-options/AccountSettings";
import PreferencesSettings from "./setting-options/PreferencesSettings";
import PrivacySettings from "./setting-options/PrivacySettings";
import NotificationSettings from "./setting-options/NotificationSettings";
import SupportSetting from "./setting-options/support-option/Help"; // default support page can be Help

const Setting = () => {
  const [activePage, setActivePage] = useState("Profile");

  const renderContent = () => {
    switch (activePage) {
      case "Profile":
        return <ProfileSettings />;
      case "Account":
        return <AccountSettings />;
      case "Preferences":
        return <PreferencesSettings />;
      case "Privacy":
        return <PrivacySettings />;
      case "Notification":
        return <NotificationSettings />;
      case "Support":
        return <SupportSetting />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="settings-wrapper">
      {/* Navbar */}
      <div className="navbar">
        <div className="logo">
          <a href="/homepage" style={{ color: "white", textDecoration: "none" }}>
            📚 Bookify
          </a>
        </div>
        <div className="auth">
          <a href="/login" className="btn-login">Log In</a>
          <a href="/signup" className="btn-join">Join for FREE</a>
        </div>
      </div>

      {/* Settings Layout */}
      <div className="settings-container">
        {/* Sidebar */}
        <div className="sidebar">
          <h3>Settings</h3>
          <ul>
            <li>
              <button
                className={activePage === "Profile" ? "active" : ""}
                onClick={() => setActivePage("Profile")}
              >
                Profile Settings
              </button>
            </li>
            <li>
              <button
                className={activePage === "Account" ? "active" : ""}
                onClick={() => setActivePage("Account")}
              >
                Account Settings
              </button>
            </li>
            <li>
              <button
                className={activePage === "Preferences" ? "active" : ""}
                onClick={() => setActivePage("Preferences")}
              >
                Preferences
              </button>
            </li>
            <li>
              <button
                className={activePage === "Privacy" ? "active" : ""}
                onClick={() => setActivePage("Privacy")}
              >
                Privacy Settings
              </button>
            </li>
            <li>
              <button
                className={activePage === "Notification" ? "active" : ""}
                onClick={() => setActivePage("Notification")}
              >
                Notification Settings
              </button>
            </li>
            <li>
              <button
                className={activePage === "Support" ? "active" : ""}
                onClick={() => setActivePage("Support")}
              >
                Support
              </button>
            </li>
          </ul>
        </div>

        {/* Content */}
        <div className="content-frame">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Setting;
