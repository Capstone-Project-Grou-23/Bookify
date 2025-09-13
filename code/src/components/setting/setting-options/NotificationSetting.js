import React, { useState } from "react";
import "./NotificationSetting.css";

const NotificationSetting = () => {
  const [activeSection, setActiveSection] = useState("email");

  const emailNotifications = [
    "Newsletter Subscription",
    "Promotional Emails",
    "Updates & Announcements",
    "Activity Alerts",
    "Security Alerts",
  ];

  const pushNotifications = [
    "App Updates",
    "New Messages",
    "Friend Requests",
    "Mentions & Tags",
    "Security Alerts",
  ];

  const renderNotifications = (notifications) => {
    return notifications.map((item, index) => (
      <div className="notification-item" key={index}>
        <span>{item}</span>
        <label className="toggle">
          <input type="checkbox" />
          <span className="slider"></span>
        </label>
      </div>
    ));
  };

  return (
    <div className="content">
      <div className="content-box">
        <h2>Notification Settings</h2>

        <div className="section-buttons">
          <button
            className={activeSection === "email" ? "active" : ""}
            onClick={() => setActiveSection("email")}
          >
            Email Notifications
          </button>
          <button
            className={activeSection === "push" ? "active" : ""}
            onClick={() => setActiveSection("push")}
          >
            Push Notifications
          </button>
        </div>

        {activeSection === "email" && (
          <div id="email-section">
            <p>Manage your email notification preferences:</p>
            {renderNotifications(emailNotifications)}
          </div>
        )}

        {activeSection === "push" && (
          <div id="push-section">
            <p>Manage your push notification preferences:</p>
            {renderNotifications(pushNotifications)}
          </div>
        )}

        <p style={{ textAlign: "center" }}>
          Click the toggle to turn each notification On/Off. Backend functionality
          can be added later.
        </p>
      </div>
    </div>
  );
};

export default NotificationSetting;
