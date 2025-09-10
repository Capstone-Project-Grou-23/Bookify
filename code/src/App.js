// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Main Setting Page
import Setting from "./components/setting/Setting";

// Setting Options
import ProfileSettings from "./components/setting/setting-options/ProfileSettings";
import AccountSettings from "./components/setting/setting-options/AccountSettings";
import PreferencesSettings from "./components/setting/setting-options/PreferencesSettings";
import PrivacySettings from "./components/setting/setting-options/PrivacySettings";
import NotificationSettings from "./components/setting/setting-options/NotificationSettings";
import SupportSetting from "./components/setting/setting-options/SupportSetting";

// Support Sub-options
import Help from "./components/setting/setting-options/support-option/Help";
import Contact from "./components/setting/setting-options/support-option/Contact";
import About from "./components/setting/setting-options/support-option/About";

function App() {
  return (
    <Router>
      <Routes>
        {/* Core Pages */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Settings Main */}
        <Route path="/settings" element={<Setting />} />

        {/* Setting Options */}
        <Route path="/settings/profile" element={<ProfileSettings />} />
        <Route path="/settings/account" element={<AccountSettings />} />
        <Route path="/settings/preferences" element={<PreferencesSettings />} />
        <Route path="/settings/privacy" element={<PrivacySettings />} />
        <Route path="/settings/notifications" element={<NotificationSettings />} />
        <Route path="/settings/support" element={<SupportSetting />} />

        {/* Support Sub-options */}
        <Route path="/settings/support/help" element={<Help />} />
        <Route path="/settings/support/contact" element={<Contact />} />
        <Route path="/settings/support/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
