import React from 'react';
import ProductCard from './ProductCard';



export default function Catalog() {
  const products = [
    {
      id: 1,
      title: "FLORAL GUERRAB",
      image: "/images/catalog1.webp",
      currentPrice: "209.30 dh",
      originalPrice: "299.00 dh",
      discount: "-30%"
    },
    {
      id: 2,
      title: "SUMMER DRESS",
      image: "/images/catalog2.webp",
      currentPrice: "189.50 dh",
      originalPrice: "250.00 dh",
      discount: "-25%"
    },
    {
      id: 3,
      title: "ELEGANT ROBE",
      image: "/images/catalog3.webp",
      currentPrice: "239.90 dh",
      originalPrice: "320.00 dh",
      discount: "-20%"
    },

    {
      id: 5,
      title: "EVENING GOWN",
      image: "/images/catalog5.webp",
      currentPrice: "349.00 dh",
      originalPrice: "499.00 dh",
      discount: "-30%"
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              image={product.image}
              currentPrice={product.currentPrice}
              originalPrice={product.originalPrice}
              discount={product.discount}
            />
          ))}
        </div>
      </div>
    </section>
  );
}