import React, { useState } from "react";
import "./Setting.css";
import { Link } from "react-router-dom";

// Import your setting option components
import ProfileSetting from "./setting-options/ProfileSetting";
import AccountSetting from "./setting-options/AccountSetting";
import PreferenceSetting from "./setting-options/PreferenceSetting";
import PrivacySetting from "./setting-options/PrivacySetting";
import NotificationSetting from "./setting-options/NotificationSetting";
import SupportSetting from "./setting-options/SupportSetting";

const Setting = () => {
  const [activePage, setActivePage] = useState("Profile");

  const renderContent = () => {
    switch (activePage) {
      case "Profile":
        return <ProfileSetting />;
      case "Account":
        return <AccountSetting />;
      case "Preferences":
        return <PreferenceSetting />;
      case "Privacy":
        return <PrivacySetting />;
      case "Notification":
        return <NotificationSetting />;
      case "Support":
        return <SupportSetting />;
      default:
        return <ProfileSetting />;
    }
  };

  return (
    <div className="settings-wrapper">
      

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
        <div className="content-frame">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Setting;
