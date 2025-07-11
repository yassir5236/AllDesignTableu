import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../axios";
import ModernHeader from "../components/Header";
import { Star } from "lucide-react";

const CategorieView = () => {
  const { id } = useParams();
  const [produits, setProduits] = useState([]);
  const [categorieNom, setCategorieNom] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      try {
        await api.delete(`/api/produits/${id}`);
        setProduits((prev) => prev.filter((p) => p.id !== id));
      } catch (err) {
        console.error("Erreur lors de la suppression", err);
        alert("Une erreur est survenue.");
      }
    }
  };

  const handleProductClick = (productId) => {
    // Navigate to product detail page
    window.location.href = `/produits/${productId}`;
  };

  const handleEdit = (id) => {
    console.log("edit clicked");
    window.location.href = `/produits/edit/${id}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        setIsLoading(true);
        const catRes = await api.get(`/api/categories/${id}`);
        setCategorieNom(catRes.data.categorie.nom);

        const prodRes = await api.get(`/api/categories/${id}/produits`);
        setProduits(prodRes.data.produits);
      } catch (err) {
        console.error("Erreur lors du chargement", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduits();
  }, [id]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="w-3 h-3 text-gray-300" />
            <Star
              className="w-3 h-3 fill-yellow-400 text-yellow-400 absolute top-0 left-0"
              style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0% 100%)" }}
            />
          </div>
        );
      } else {
        stars.push(<Star key={i} className="w-3 h-3 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <>
      <ModernHeader
        bgColor="orange"
        textColor="black"
        textColorCategory="black"
        isScrolled={isScrolled}
      />

      {/* Modern Header Section */}
      <div className="relative bg-gradient-to-r from-slate-50 to-blue-50 pt-20 pb-16 mt-20">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-100 rounded-full opacity-30 blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6">
          {/* Category Name */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gray-600 mb-4 tracking-tight">
              {categorieNom}
            </h1>

            {/* Decorative line */}
            <div className="flex items-center justify-center mt-6">
              <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent w-32"></div>
              <div className="mx-4 w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent w-32"></div>
            </div>
          </div>

          {/* Subtitle */}
          <div className="text-center">
            <p className="text-lg text-gray-600 font-medium">
              Découvrez notre collection{" "}
              {categorieNom ? categorieNom.toLowerCase() : ""}
            </p>
          </div>
        </div>

        {/* Smooth wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-8 text-white"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      {/* Products Section */}
      <div className="bg-white  px-6">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="relative">
                <div className="animate-spin h-12 w-12 border-4 border-blue-200 rounded-full"></div>
                <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full absolute top-0 left-0"></div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {produits.map((p) => (
                <div
                  key={p.id}
                  className="bg-white  shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  onClick={() => handleProductClick(p.id)}
                >
                  {/* Product Image Container */}
                  <div className="relative">
                    {/* Discount Badge */}
                    {p.promotion && (
                      <div className="absolute top-2 left-2 bg-[#A92E07] text-white text-xs font-bold px-2 py-1 rounded z-10">
                        -{p.promotion}%
                      </div>
                    )}

                    {/* Product Image */}
                    <div className="w-full h-64 bg-gray-100 overflow-hidden">
                      <img
                        src={`http://localhost:8000/storage/${p.image}`}
                        alt={p.nom}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-3 space-y-2">
                    {/* Title */}
                    <h3 className="text-gray-800 font-medium text-sm leading-tight line-clamp-2">
                      {p.nom}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center space-x-1">
                      <div className="flex space-x-0.5">
                        {renderStars(p.note)}
                      </div>
                      <span className="text-gray-500 text-xs">
                        ({Math.floor(Math.random() * 50) + 1})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-800 font-bold text-lg">
                        {p.promotion
                          ? (p.prix * (1 - p.promotion / 100)).toFixed(2) +
                            " dh"
                          : p.prix + " dh"}
                      </span>
                      {p.promotion && (
                        <span className="text-gray-400 text-xs line-through">
                          {p.prix} dh
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-2">
                      {/* Edit & Delete buttons */}
                      <div className="flex space-x-2">
                        <button
                          className="p-1 hover:bg-gray-100 rounded"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(p.id);
                          }}
                          title="Modifier"
                        >
                          <svg
                            width="20px"
                            height="20px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20.1497 7.93997L8.27971 19.81C7.21971 20.88 4.04971 21.3699 3.27971 20.6599C2.50971 19.9499 3.06969 16.78 4.12969 15.71L15.9997 3.84C16.5478 3.31801 17.2783 3.03097 18.0351 3.04019C18.7919 3.04942 19.5151 3.35418 20.0503 3.88938C20.5855 4.42457 20.8903 5.14781 20.8995 5.90463C20.9088 6.66146 20.6217 7.39189 20.0997 7.93997H20.1497Z"
                              stroke="#22c55e"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M21 21H12"
                              stroke="#22c55e"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        <button
                          className="p-1 hover:bg-gray-100 rounded"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevents triggering product card click
                            handleDelete(p.id);
                          }}
                          title="Supprimer"
                        >
                          <svg
                            width="20px"
                            height="20px"
                            viewBox="0 0 64 64"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="2"
                          >
                            <circle cx="32" cy="32" r="24"></circle>
                            <line x1="20" y1="32" x2="44" y2="32"></line>
                          </svg>
                        </button>
                      </div>

                      {/* Heart/Wishlist button */}
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-600 hover:text-red-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && produits.length === 0 && (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg font-medium">
                  Aucun produit trouvé dans cette catégorie
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Revenez plus tard pour découvrir nos nouveautés
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .clip-half {
          clip-path: polygon(0 0, 50% 0, 50% 100%, 0% 100%);
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default CategorieView;
