import React from "react";
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

// Layout component to wrap pages with Navbar and Footer
const PageLayout = () => (
  <>
    <Navbar />
    <main style={{ flex: '1', padding: '20px 0' }}>
      <Outlet />
    </main>
    <Footer />
  </>
);


function App() {
  return (
    <Router>
       <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Routes with Navbar and Footer */}
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
