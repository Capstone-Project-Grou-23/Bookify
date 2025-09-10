import React from "react";
import "./ProfileSetting.css";

const ProfileSetting = () => {
  return (
    <div>
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

      {/* Settings Container */}
      <div className="settings-container">
        <div className="settings-box">
          <h2>Profile Settings</h2>
          <p>Manage your profile information</p>
          <div className="settings-options">
            <a href="/edit-profile-info">Edit Profile Info</a>
            <a href="/edit-profile-picture">Edit Profile Picture</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;
