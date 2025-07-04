
import React from "react";
// src/components/CatalogueDropdown.jsx
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const options = [
  "Canapés",
  "Lits",
  "Tables",
  "Chaises",
  "Décoration",
  "Étagères",
];

export default function CatalogueDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleSelect = (option) => {
    console.log("Selected:", option);
    setIsOpen(false); // Close after selection
  };

  // Optional: Close if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    // Delay to allow clicks to register before hiding
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Button */}
      <div className="flex items-center gap-1 text-white hover:text-yellow-400 transition duration-300 relative group cursor-pointer">
        Catalogue
        <ChevronDown className="w-4 h-4" />
        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 ease-out group-hover:w-full"></span>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 mt-3 w-64 bg-white rounded shadow-lg ring-1 ring-gray-200 z-50">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className="px-5 py-3 text-sm text-gray-800 hover:bg-yellow-100 cursor-pointer transition duration-200"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
