import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Navbar from "./components/homepage/Navbar";
import Hero from "./components/homepage/Hero";
import Footer from "./components/homepage/Footer";
import Profile from "./components/profile/Profile";
import Setting from "./components/setting/Setting";
import Buy from "./components/buy/Buy";
import Sell from "./components/sell/Sell";

// 🔹 This React component will handle the /auth/callback frontend route
// and call your backend endpoint
const AuthCallback = () => {
  useEffect(() => {
    fetch("http://localhost:5000/auth/callback")
      .then((res) => res.json())
      .then((data) => {
        console.log("Auth callback response:", data);
      })
      .catch((err) => console.error("Error fetching auth callback:", err));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Authenticating...</h2>
      <p>Please wait while we process your login.</p>
    </div>
  );
};

// 🔹 Layout wrapper (Navbar + Footer around main content)
const PageLayout = () => (
  <>
    <Navbar />
    <main style={{ flex: "1", padding: "20px 0" }}>
      <Outlet />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Main Routes with Navbar + Footer */}
          <Route element={<PageLayout />}>
            <Route path="/" element={<Hero />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Setting />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/sell" element={<Sell />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
