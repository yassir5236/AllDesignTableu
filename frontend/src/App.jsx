import "./App.css";
import React from "react";
import Navbar from "./components/Header";
import Hero from "./components/Hero";
import Catalog from "./components/Catalog";
import About from "./components/About";
import RecentWorks from "./components/RecentWorks";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="">
        <Navbar />
        <Hero />

        <Catalog />
        <About />
        <RecentWorks />
        <Reviews />

        <Footer/>
      </div>
    </>
  );
}

export default App;
