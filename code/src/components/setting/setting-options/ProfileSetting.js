import React from "react";
import "./ProfileSetting.css";

const ProfileSetting = () => {
  return (
    <div>
      

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
