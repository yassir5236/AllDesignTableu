// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import React from "react";
import CatalogueDropdown from "./CatalogueDropdown"; // at top

import { useEffect, useState } from "react";
import api from "../axios";

export default function Header({ refreshSignal } ) {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/api/categories");
      setCategories(res.data.categories);
    } catch (err) {
      console.error("Erreur lors du chargement des catégories", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [refreshSignal]);
  return (
    <header className="absolute top-0 left-0 w-full z-20 text-white pt-10 rounded-t-3xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <svg
              fill="#ffffff"
              width="30px"
              height="30px"
              viewBox="0 0 1920 1920"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#ffffff"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M517.257 1127.343c72.733 0 148.871 36.586 221.274 107.45 87.455 110.418 114.922 204.135 81.632 278.296-72.733 162.274-412.664 234.897-618.666 259.178 34.609-82.62 75.15-216.88 75.15-394.645 0-97.123 66.47-195.455 157.88-233.689 26.698-11.097 54.494-16.59 82.73-16.59Zm229.404-167.109c54.055 28.895 106.462 65.371 155.133 113.494l13.844 15.6c28.016 35.378 50.649 69.987 70.425 104.155-29.554 26.259-59.878 52.737-90.75 79.545-18.898-35.488-43.069-71.964-72.843-109.319l-4.285-4.834c-48.342-47.683-99.43-83.39-151.727-107.011 26.368-30.653 53.066-61.196 80.203-91.63Zm1046.49-803.133c7.801 7.8 18.129 21.754 16.92 52.187-6.043 155.683-284.338 494.405-740.509 909.266-19.995-32.302-41.969-64.822-67.788-97.453l-22.523-25.27c-49.22-48.671-101.408-88.883-156.012-121.074 350.588-385.855 728.203-734.356 910.254-741.828 30.983-.109 44.497 9.01 59.658 24.172Zm126.678 56.472c2.087-53.615-14.832-99.98-56.142-141.29-34.28-34.279-81.962-51.198-134.588-49.11-304.554 12.414-912.232 683.377-1179.54 996.17-53.616-5.383-106.682 2.088-157.441 23.402-132.61 55.263-225.339 193.038-225.339 334.877 0 268.517-103.935 425.737-104.923 427.275L0 1896.747l110.307-6.153c69.217-3.735 681.29-45.375 810.165-332.46 24.39-54.604 29.225-113.163 15.93-175.239 374.32-321.802 972.11-879.71 983.427-1169.322"
                  fillRule="evenodd"
                ></path>{" "}
              </g>
            </svg>
            <h2 className="text-3xl p-2">All Design</h2>
          </div>

          {/* Navigation with animated underlines */}
          <nav className="hidden md:flex items-center space-x-8 mt-2">
            <a
              href="#"
              className="relative text-white transition-colors duration-300 hover:text-yellow-400 group"
            >
              Accueil
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 ease-out group-hover:w-full"></span>
            </a>
            <CatalogueDropdown categories={categories} />

            <a
              href="#"
              className="relative text-white transition-colors duration-300 hover:text-yellow-400 group"
            >
              À propos
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 ease-out group-hover:w-full"></span>
            </a>

            <a
              href="#"
              className="relative text-white transition-colors duration-300 hover:text-yellow-400 group"
            >
              Contact
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 ease-out group-hover:w-full"></span>
            </a>
            <Link
              to="/login"
              className="relative text-white transition-colors duration-300 hover:text-yellow-400 group"
            >
              Login
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 ease-out group-hover:w-full"></span>
            </Link>

            <Link
              to="/Register"
              className="relative text-white transition-colors duration-300 hover:text-yellow-400 group"
            >
              Register
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 ease-out group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Contact Info */}
          <div className="flex items-center space-x-4 mt-2">
            <span className="text-white text-sm">+2126-65-99-33-64</span>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded text-sm font-medium hover:bg-yellow-600 transition-colors duration-300">
              Demander un rappel
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
