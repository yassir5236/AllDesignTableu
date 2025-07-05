import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import api from "../axios";
import { useNavigate } from "react-router-dom";

export default function CatalogueDropdown({ categories }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

const handleSelect = (cat) => {
  navigate(`/categorie/${cat.id}`); // ✅ Utiliser cat.id
  setIsOpen(false);
};

  // Close if clicking outside
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
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center gap-1 text-white hover:text-yellow-400 transition duration-300 relative group cursor-pointer">
        Catalogue
        <ChevronDown className="w-4 h-4" />
        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 ease-out group-hover:w-full"></span>
      </div>

      {isOpen && (
        <div className="absolute left-0 mt-3 w-64 bg-white rounded shadow-lg ring-1 ring-gray-200 z-50">
          {categories?.length > 0 ? (
            categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => handleSelect(cat)}
                className="px-5 py-3 text-sm text-gray-800 hover:bg-yellow-100 cursor-pointer transition duration-200"
              >
                {cat.nom}
              </div>
            ))
          ) : (
            <div className="px-5 py-3 text-sm text-gray-400">
              Aucune catégorie
            </div>
          )}
        </div>
      )}
    </div>
  );
}
