import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  User,
  Heart,
  ShoppingCart,
  Search,
} from "lucide-react";

import api from "../axios";
import CatalogueDropdown from "./CatalogueDropdown";

export default function ModernHeader({
  refreshSignal,
  bgColor = "transparent",
  textColor,
  textColorCategory,
/*   isScrolled = { isScrolled },
 */}) {
  const [categories, setCategories] = useState([
    { name: "Design Web" },
    { name: "Graphisme" },
    { name: "Branding" },
    { name: "Digital" },
  ]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
const [isScrolled, setIsScrolled] = useState(false);
 
  // Mock API call
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
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { name: "HOME", href: "#" },
    { name: "ABOUT", href: "#" },
    { name: "CONTACT", href: "#" },
  ];

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 shadow-xl ${
          bgColor === "orange"
            ? isScrolled
              ? "bg-white text-black shadow-2xl "
              : "bg-white text-black"
            : isScrolled
            ? "bg-white/10 backdrop-blur-lg text-white shadow-lg "
            : "bg-transparent text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3 group">
              <div
                className={`${
                  textColor === "black" ? "hidden" : "relative"
                }
                `}
              >
                <svg
                  fill="currentColor"
                  width="36"
                  height="36"
                  viewBox="0 0 1920 1920"
                  className="text-white group-hover:text-yellow-400 transition-colors duration-300 drop-shadow-lg"
                >
                  <path
                    d="M517.257 1127.343c72.733 0 148.871 36.586 221.274 107.45 87.455 110.418 114.922 204.135 81.632 278.296-72.733 162.274-412.664 234.897-618.666 259.178 34.609-82.62 75.15-216.88 75.15-394.645 0-97.123 66.47-195.455 157.88-233.689 26.698-11.097 54.494-16.59 82.73-16.59Zm229.404-167.109c54.055 28.895 106.462 65.371 155.133 113.494l13.844 15.6c28.016 35.378 50.649 69.987 70.425 104.155-29.554 26.259-59.878 52.737-90.75 79.545-18.898-35.488-43.069-71.964-72.843-109.319l-4.285-4.834c-48.342-47.683-99.43-83.39-151.727-107.011 26.368-30.653 53.066-61.196 80.203-91.63Zm1046.49-803.133c7.801 7.8 18.129 21.754 16.92 52.187-6.043 155.683-284.338 494.405-740.509 909.266-19.995-32.302-41.969-64.822-67.788-97.453l-22.523-25.27c-49.22-48.671-101.408-88.883-156.012-121.074 350.588-385.855 728.203-734.356 910.254-741.828 30.983-.109 44.497 9.01 59.658 24.172Zm126.678 56.472c2.087-53.615-14.832-99.98-56.142-141.29-34.28-34.279-81.962-51.198-134.588-49.11-304.554 12.414-912.232 683.377-1179.54 996.17-53.616-5.383-106.682 2.088-157.441 23.402-132.61 55.263-225.339 193.038-225.339 334.877 0 268.517-103.935 425.737-104.923 427.275L0 1896.747l110.307-6.153c69.217-3.735 681.29-45.375 810.165-332.46 24.39-54.604 29.225-113.163 15.93-175.239 374.32-321.802 972.11-879.71 983.427-1169.322"
                    fillRule="evenodd"
                  />
                </svg>
                <div className="absolute inset-0 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
              </div>
              <h1
                className={`${
                  textColor === "black" ? "text-gray-600" : "text-white/90"
                } text-2xl lg:text-3xl font-bold  group-hover:text-yellow-400 transition-colors duration-300 drop-shadow-lg`}
              >
                All Design
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`${
                    textColor === "black" ? "text-gray-600" : "text-white/90"
                  } relative  hover:text-amber-500  text-sm  transition-all duration-300 group font-medium `}
                >
                  {item.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-300 ease-out group-hover:w-full"></span>
                </a>
              ))}

              <CatalogueDropdown
                categories={categories}
                textColorCategory={textColorCategory}
              />

              <a
                href="/login"
                className={`${
                  textColor === "black" ? "text-gray-600" : "text-white/90"
                } relative  hover:text-amber-600 transition-all duration-300 group font-medium`}
              >
                LOGIN
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-300 ease-out group-hover:w-full"></span>
              </a>

              <a
                href="/register"
                className={`${
                  textColor === "black" ? "text-white/90" : "text-white/90"
                } bg-gradient-to-r from-yellow-500 to-yellow-600  px-6 py-2.5 rounded-full font-medium hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105`}
              >
                REGISTER
              </a>
            </nav>

            {/* Contact Info & Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              {/* Phone Number - Hidden on small screens */}
              {/*  <div className="hidden xl:flex items-center space-x-2 text-white/90">
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">+2126-65-99-33-64</span>
              </div> */}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>

              {/* Right Side Icons */}
              <div className="flex items-center space-x-4">
                {/* Search */}
                <button className="p-2 text-gray-300 hover:text-amber-400 transition-colors duration-300">
                  <Search className="w-5 h-5" />
                </button>

                {/* User Account */}
                <button className="p-2 text-gray-300 hover:text-amber-400 transition-colors duration-300">
                  <User className="w-5 h-5" />
                </button>

                {/* Wishlist */}
                <button className="p-2 text-gray-300 hover:text-amber-400 transition-colors duration-300 relative">
                  <Heart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    0
                  </span>
                </button>

                {/* Cart */}
                <button className="p-2 text-gray-300 hover:text-amber-400 transition-colors duration-300 relative">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    2
                  </span>
                </button>

                {/* Call Back Button - Hidden on small screens */}
                <button
                  className={`${
                    textColor === "black"
                      ? "hidden md:hidden"
                      : " hidden md:block text-white/90"
                  }  bg-white/10 backdrop-blur-sm border border-white/20  px-4 py-2 rounded-full text-sm font-medium hover:bg-white/20 transition-all duration-300 shadow-lg`}
                >
                  Demander un rappel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-500 ease-in-out ${
            isMenuOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          } overflow-hidden`}
        >
          <div className="bg-white/10 backdrop-blur-xl border-t border-white/20">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-white/90 hover:text-white transition-colors duration-300 font-medium py-2"
                >
                  {item.name}
                </a>
              ))}

              <div className="py-2">
                <CatalogueDropdown categories={categories} />
              </div>

              <a
                href="/login"
                className="block text-white/90  text-sm  hover:text-white transition-colors duration-300 font-medium py-2"
              >
                Login
              </a>

              <a
                href="/register"
                className="block bg-gradient-to-r  text-sm  from-yellow-500 to-yellow-600 text-white px-6 py-3 rounded-full font-medium text-center hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-lg"
              >
                Register
              </a>

              {/* Mobile Contact Info */}
              <div className="pt-4 border-t border-white/20">
                <div className="flex items-center space-x-2 text-white/90 text-sm">
                  <Phone className="w-4 h-4" />
                  <span>+2126-65-99-33-64</span>
                </div>
                <button className="mt-3 w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/20 transition-all duration-300">
                  Demander un rappel
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Spacer to prevent content from going under fixed header */}
      {/*       <div className="h-20"></div>
       */}{" "}
    </>
  );
}

/* 

import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Phone, User, Heart, ShoppingCart, Search } from "lucide-react";
import api from "../axios";
import CatalogueDropdown from "./CatalogueDropdown";

export default function ModernHeader({
  refreshSignal,
  bgColor = "transparent",
  textColor = "white",
  textColorCategory,
  isScrolled = false,
}) {
  const [categories, setCategories] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const navigationItems = [
    { name: "NOUVEAUTÉS", href: "#" },
    { name: "BESTSELLERS", href: "#" },
    { name: "THÈMES", href: "#", hasDropdown: true },
    { name: "FORMAT", href: "#", hasDropdown: true },
    { name: "COULEURS", href: "#", hasDropdown: true },
    { name: "INTÉRIEUR", href: "#", hasDropdown: true },
    { name: "ARTISTES", href: "#" },
    { name: "PROMOS D'ÉTÉ", href: "#", isPromo: true },
    { name: "AVIS CLIENTS", href: "#" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl font-bold">M</span>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-blue-600">
                MASSINART
              </h1>
            </div>

            <nav className="hidden lg:flex items-center space-x-6">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative group">
                  <a
                    href={item.href}
                    className={`${
                      item.isPromo 
                        ? "text-red-600 font-semibold" 
                        : "text-gray-700 hover:text-blue-600"
                    } transition-colors duration-300 font-medium text-sm flex items-center space-x-1`}
                  >
                    <span>{item.name}</span>
                    {item.hasDropdown && (
                      <ChevronDown className="w-4 h-4" />
                    )}
                    {item.isPromo && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-1">
                        HOT
                      </span>
                    )}
                  </a>
                  {item.hasDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-300">
                <Search className="w-5 h-5" />
              </button>

              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-300">
                <User className="w-5 h-5" />
              </button>

              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-300 relative">
                <Heart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </button>

              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-300 relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  2
                </span>
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`lg:hidden transition-all duration-500 ease-in-out ${
            isMenuOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          } overflow-hidden`}
        >
          <div className="bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block ${
                    item.isPromo 
                      ? "text-red-600 font-semibold" 
                      : "text-gray-700 hover:text-blue-600"
                  } transition-colors duration-300 font-medium py-2`}
                >
                  {item.name}
                  {item.isPromo && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-2">
                      HOT
                    </span>
                  )}
                </a>
              ))}

              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-300">
                    <User className="w-5 h-5" />
                    <span>Mon Compte</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-300">
                    <Heart className="w-5 h-5" />
                    <span>Favoris</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-300">
                    <ShoppingCart className="w-5 h-5" />
                    <span>Panier</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
} */
