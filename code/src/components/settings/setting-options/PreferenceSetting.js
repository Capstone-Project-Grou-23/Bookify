import React, { useState } from "react";
import "./PreferenceSetting.css";

const PreferenceSetting = () => {
  const [theme, setTheme] = useState("light");
  const [font, setFont] = useState("arial");
  const [language, setLanguage] = useState("en");

  return (
    <div className="content">
      <h2>Preferences</h2>
      <p>Customize your app experience</p>

      {/* Theme Selection */}
      <div className="preference-card">
        <label htmlFor="theme">Theme</label>
        <select
          id="theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System Default</option>
        </select>
      </div>

      {/* Font Selection */}
      <div className="preference-card">
        <label htmlFor="font">Font</label>
        <select
          id="font"
          value={font}
          onChange={(e) => setFont(e.target.value)}
        >
          <option value="arial">Arial</option>
          <option value="roboto">Roboto</option>
          <option value="times">Times New Roman</option>
          <option value="comic">Comic Sans</option>
        </select>
      </div>

      {/* Language Selection */}
      <div className="preference-card">
        <label htmlFor="language">Language</label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="jp">Japanese</option>
        </select>
      </div>

      <p>Adjust the above preferences as desired. Backend functionality can be added later.</p>
    </div>
  );
};

export default PreferenceSetting;
