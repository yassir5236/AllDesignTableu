import "./App.css";
import React from "react";
import Navbar from "./components/Header";
import Hero from "./components/Hero";
import Catalog from "./components/Catalog";
import About from "./components/About";
import RecentWorks from "./components/RecentWorks";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Hero />
            <Catalog />
            <About />
            <RecentWorks />
            <Reviews />
            <Footer />
          </>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
