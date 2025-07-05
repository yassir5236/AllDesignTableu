import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../axios";
import Header from "../components/Header";
import { Star } from "lucide-react";

const CategorieView = () => {
  const { id } = useParams();
  const [produits, setProduits] = useState([]);
  const [categorieNom, setCategorieNom] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      try {
        await api.delete(`/api/produits/${id}`);
        setProduits((prev) => prev.filter((p) => p.id !== id)); // Retirer sans recharger tout
      } catch (err) {
        console.error("Erreur lors de la suppression", err);
        alert("Une erreur est survenue.");
      }
    }
  };

  const handleEdit = (id) => {
    // Redirection vers la page d'édition (ex: /produits/edit/:id)
    window.location.href = `/produits/edit/${id}`;
  };
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
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="w-4 h-4 text-gray-300" />
            <Star
              className="w-4 h-4 fill-yellow-400 text-yellow-400 absolute top-0 left-0"
              style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0% 100%)" }}
            />{" "}
          </div>
        );
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <>
      <Header />
      <div className="pt-32 px-6 pb-12 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">
          Catégorie : <span className="text-blue-600">{categorieNom}</span>
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin  h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {produits.map((p) => (
              <div
                key={p.id}
                className="bg-white  shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Product Image Container */}
                <div className="relative">
                  {/* Discount Badge */}
                  {p.promotion && (
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-sm font-semibold px-2 py-1 rounded-full z-10">
                      -{p.promotion}%
                    </div>
                  )}

                  {/* Product Image */}
                  <div className="w-full h-64 bg-gray-100 overflow-hidden">
                    <img
                      src={`http://localhost:8000/storage/${p.image}`}
                      alt={p.nom}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5 space-y-3">
                  {/* Title */}
                  <h3 className="text-gray-800 font-semibold text-lg tracking-wide line-clamp-2">
                    {p.nom}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-0.5">
                      {renderStars(p.note)}
                    </div>
                    <span className="text-gray-500 text-sm font-medium">
                      ({Math.floor(Math.random() * 50) + 1})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-800 font-bold text-xl">
                      {p.promotion
                        ? (p.prix * (1 - p.promotion / 100)).toFixed(2) + " DH"
                        : p.prix + " DH"}
                    </span>
                    {p.promotion && (
                      <span className="text-gray-400 text-sm line-through">
                        {p.prix} DH
                      </span>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="pt-2 flex space-x-2">
                    <button className="flex-1 bg-gray-400 hover:bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                      Voir détails
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-700"
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
                  <div className="pt-2 flex space-x-2">
                    <button
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium"
                      onClick={() => handleEdit(p.id)}
                    >
                      Modifier
                    </button>
                    <button
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium"
                      onClick={() => handleDelete(p.id)}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && produits.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Aucun produit trouvé dans cette catégorie
            </p>
          </div>
        )}
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
