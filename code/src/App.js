import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Navbar from "./components/homepage/Navbar";
import Hero from "./components/homepage/Hero";
import Profile from "./components/profile/Profile";
import Setting from "./components/setting/Setting"; 
import Buy from "./components/buy/Buy";
import Sell from "./components/sell/Sell";
import Footer from "./components/homepage/Footer"; // Import Footer

function HomePage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Footer /> {/* Add Footer here */}
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
        <Route path="/buy" element={<Buy />} />
        <Route path="/sell" element={<Sell />} />
      </Routes>
    </Router>
  );
}

export default App;
