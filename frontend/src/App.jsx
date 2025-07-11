import "./App.css";
import React, { useEffect, useState } from "react";
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
import CategorieView from "./pages/CategorieView";
import EditProduit from "./components/EditProduit";
import ProductDetail2 from "./pages/productDetail2";
import ProductDetail from "./pages/ProductDetail";


function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar
              textColor="white"
              textColorCategory="white"
              isScrolled={isScrolled}
            />
            <Hero />
            <Catalog />
            <About />
            <RecentWorks />
            <Reviews />
            <Footer />
          </>
        }
      />
      <Route path="/produits/:id" element ={<ProductDetail2/>}/>
      <Route path="/categorie/:id" element={<CategorieView />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/produits/edit/:id" element={<EditProduit />} />

      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
