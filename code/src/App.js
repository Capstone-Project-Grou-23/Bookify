import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./Signup";  // make sure Signup.js exists
import Login from "./Login";    // make sure Login.js exists
import Home from "./Home";      // optional homepage

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
