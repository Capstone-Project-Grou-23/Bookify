import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation, useNavigate } from "react-router-dom";
// Import Components
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Navbar from "./components/homepage/Navbar";
import Hero from "./components/homepage/Hero";
import Footer from "./components/homepage/Footer";
import Profile from "./components/profile/Profile";
import Setting from "./components/setting/Setting";

// Remove the old Buy import if it's no longer needed elsewhere
// import Buy from "./components/buy/Buy";
import Sell from "./components/sell/Sell";
import BookList from "./components/booklist/BookList"; // Import the new BookList component

const AuthCallback = () => {
  const location = useLocation(); // Hook to get current URL info
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    // Create a URLSearchParams object from the URL's search string (e.g., "?token=...&user=...")
    const params = new URLSearchParams(location.search);
    const token = params.get('token'); // Get the 'token' parameter
    const user = params.get('user'); // Get the 'user' parameter

    if (token && user) {
      // If both token and user exist in the URL...
      localStorage.setItem('token', token); // Save the token
      localStorage.setItem('user', decodeURIComponent(user)); // Decode and save user info
      navigate('/'); // Redirect to the homepage
    } else {
      // If token or user is missing, something went wrong
      navigate('/login'); // Redirect back to login page
    }
    // Run this effect only once when the component mounts, watching for changes in location or navigate
  }, [location, navigate]);

  // Display a loading message while processing
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
    {/* Use min-height on main to help push footer down */}
    <main style={{ flex: "1", padding: "20px 0", minHeight: "calc(100vh - 120px)" /* Adjust height based on Navbar/Footer */ }}>
      <Outlet /> {/* Renders the matched child route component */}
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
          {/* Auth Routes - Typically don't use the main layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* This route uses the inline AuthCallback defined above */}
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Main Application Routes - Use the PageLayout */}
          <Route element={<PageLayout />}>
            <Route path="/" element={<Hero />} />
            <Route path="/profile" element={<Profile />} />
            {/* Corrected the settings path */}
            <Route path="/settings" element={<Setting />} />
            {/* The /buy route now renders the BookList component */}
            <Route path="/buy" element={<BookList />} />
            <Route path="/sell" element={<Sell />} />
            {/* Add other main routes here if needed */}
          </Route>

          {/* Optional: Add a 404 Not Found route */}
          {/* <Route path="*" element={<NotFoundComponent />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
