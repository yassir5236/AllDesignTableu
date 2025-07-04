import { useState } from 'react';
import { HeartIcon, EyeIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import React from "react";

const ProductCard = ({ title, image, currentPrice, originalPrice, discount }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative max-w-xs overflow-hidden rounded-lg shadow-lg bg-white transition-all duration-300 hover:shadow-xl">
      {/* Sale Badge */}
      {discount && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
          {discount}
        </div>
      )}
      
      {/* Product Image Container */}
      <div 
        className="relative h-64 w-full overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image with Zoom Effect */}
        <img 
          src={image} 
          alt={title} 
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
          onError={(e) => {
            e.target.onerror = null;
          }}
        />
        
        {/* Hover Buttons - No Dark Overlay */}
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center space-x-4 transition-all duration-300">
            <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white hover:scale-110 transition-all duration-200 shadow-md">
              <HeartIcon className="h-5 w-5 text-gray-700" />
            </button>
            <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white hover:scale-110 transition-all duration-200 shadow-md">
              <EyeIcon className="h-5 w-5 text-gray-700" />
            </button>
            <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white hover:scale-110 transition-all duration-200 shadow-md">
              <ShoppingCartIcon className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <div className="flex items-center mt-1">
              <span className="text-red-500 font-bold">{currentPrice}</span>
              <span className="text-gray-500 text-sm line-through ml-2">{originalPrice}</span>
            </div>
          </div>
          <button 
            className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-300 ${
              isHovered ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            COMMANDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;