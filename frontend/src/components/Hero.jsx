import React, { useEffect, useState } from "react";

export default function Hero() {
  const images = [
    "/images/pexels-wangming-photo-115695-354939.jpg",
    "/images/pexels-heyho-6434634.jpg",
    "/images/pexels-kampus-8730067.jpg",
    "/images/pexels-heyho-6538906.jpg",
    "/images/pexels-heyho-6434633.jpg",
    "/images/pexels-punttim-139764.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen pt-24 overflow-hidden">
      {/* Render all images stacked and fade in/out */}
      <div className="absolute inset-0 z-0">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Background ${index}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* Overlay for dark tint */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <div className="text-white">
            <h1 className="text-5xl lg:text-6xl font-light mb-4">
              Studio de design de mobilier
            </h1>
            <p className="text-lg mb-8 text-gray-200">
              Fabrication de mobilier de haute qualité
            </p>
            <button className="bg-yellow-400 text-black px-8 py-3 rounded font-medium hover:bg-yellow-500 transition-colors">
              Commander un projet
            </button>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-8 flex flex-col space-y-3">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImage ? "bg-white" : "bg-white/50"
              }`}
            ></div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="absolute bottom-8 right-8 flex space-x-12 text-white">
          <div className="text-center">
            <div className="text-2xl font-light">10 ans sur le marché</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-light">6000 projets</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-light">5 ans de garantie</div>
          </div>
        </div>
      </div>
    </section>
  );
}
