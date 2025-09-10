// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pagess

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
import Navbar from "./components/homepage/Navbar";

function App() {
  return (
    <Router>
      <Routes>
        {/* Core Pages */}
        <Route path="/homepage/" element={<Navbar />} />
        <Route path="/signup/" element={<login />} />
        <Route path="/signup/S" element={<ignup />} />

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
