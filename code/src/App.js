import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Navbar from "./components/homepage/Navbar";
import Hero from "./components/homepage/Hero";
import Profile from "./components/profile/Profile";
import Setting from "./components/setting/Setting";
import Buy from "./components/buy/Buy"; // Import Buy component
import Sell from "./components/sell/Sell"; // Import Sell component


function HomePage() {
  return (
    <div>
      <Navbar />
      <Hero />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/buy" element={<Buy />} /> {/* ✅ Added Buy route */}
        <Route path="/sell" element={<Sell />} /> {/* ✅ Added Sell route */}
      </Routes>
    </Router>
  );
}

export default App;
