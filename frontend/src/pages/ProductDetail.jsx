import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  Heart,
  Share2,
  MessageCircle,
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  RefreshCw,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Header from "../components/Header";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFrame, setSelectedFrame] = useState("");
  const [selectedQuality, setSelectedQuality] = useState("Premium");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mock product data - replace with actual API call
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setProduct({
          id: 1,
          nom: "Ayat al Kursi",
          prix: 749.0,
          promotion: 30,
          note: 5,
          reviews: 7,
          description:
            "Affirmez votre style avec une décoration unique. Apportez bien-être et sérénité à votre espace. Valorisez la créativité et soutenez l'art et les artistes. Obtenez une décoration raffinée et élégante.",
          dimensions: "L60 x H60 cm",
          qualite: "Premium",
          cadre: "Bois naturel",
          images: [
            "/api/placeholder/600/600",
            "/api/placeholder/600/600",
            "/api/placeholder/600/600",
          ],
          sizes: [
            { label: "L60 x H60 cm", value: "60x60", selected: true },
            { label: "L100 x H100 cm", value: "100x100", selected: false },
            { label: "L120 x H120 cm", value: "120x120", selected: false },
          ],
          frames: [
            { label: "Gris", color: "#9CA3AF", value: "grey" },
            {
              label: "Bois naturel",
              color: "#D2B48C",
              value: "natural",
              selected: true,
            },
            { label: "Noir", color: "#1F2937", value: "black" },
            { label: "Bois clair", color: "#F5DEB3", value: "light-wood" },
          ],
          qualities: ["Premium", "Standard"],
          features: [
            "Livraison rapide",
            "Satisfait ou remboursé",
            "Garantie 2 ans",
            "Frais de livraison offerts !",
          ],
        });
        setSelectedSize("60x60");
        setSelectedFrame("natural");
        setIsLoading(false);
      }, 1000);
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (delta) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleImageNavigation = (direction) => {
    if (!product) return;
    const newIndex =
      direction === "next"
        ? (currentImageIndex + 1) % product.images.length
        : (currentImageIndex - 1 + product.images.length) %
          product.images.length;
    setCurrentImageIndex(newIndex);
  };

  const calculateDiscountedPrice = () => {
    if (!product) return 0;
    return product.promotion
      ? (product.prix * (1 - product.promotion / 100)).toFixed(2)
      : product.prix.toFixed(2);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "fill-blue-500 text-blue-500" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Produit non trouvé
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-800"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header
        bgColor="orange"
        textColor="black"
        textColorCategory="black"
        isScrolled={isScrolled}
      />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-30 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative bg-gray-100  overflow-hidden aspect-square">
              <img
                src={product.images[currentImageIndex]}
                alt={product.nom}
                className="w-full h-full object-cover"
              />
              {product.promotion && (
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  -{product.promotion}%
                </div>
              )}

              {/* Navigation Arrows */}
              <button
                onClick={() => handleImageNavigation("prev")}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => handleImageNavigation("next")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-20 h-20  overflow-hidden border-2 ${
                    currentImageIndex === index
                      ? "border-amber-600"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.nom} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.nom}
              </h1>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex space-x-1">
                  {renderStars(product.note)}
                </div>
                <span className="text-sm text-gray-600">
                  ({product.reviews})
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">
                {calculateDiscountedPrice()} dh
              </span>
              {product.promotion && (
                <span className="text-lg text-gray-500 line-through">
                  {product.prix.toFixed(2)} dh
                </span>
              )}
            </div>

            {/* Dimensions */}
            <div>
              <p className="text-sm text-gray-600 mb-2">
                Dimensions: {product.dimensions}
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Taille:
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.value}
                    onClick={() => setSelectedSize(size.value)}
                    className={`px-4 py-2  border text-sm font-medium ${
                      selectedSize === size.value
                        ? "bg-amber-600 text-white border-amber-600"
                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quality Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Qualité: {selectedQuality}
              </h3>
              <div className="flex gap-2">
                {product.qualities.map((quality) => (
                  <button
                    key={quality}
                    onClick={() => setSelectedQuality(quality)}
                    className={`px-4 py-2  border text-sm font-medium ${
                      selectedQuality === quality
                        ? "bg-amber-600 text-white border-amber-600"
                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {quality}
                  </button>
                ))}
              </div>
            </div>

            {/* Frame Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Cadre: {product.cadre}
              </h3>
              <div className="flex space-x-2">
                {product.frames.map((frame) => (
                  <button
                    key={frame.value}
                    onClick={() => setSelectedFrame(frame.value)}
                    className={`w-12 h-12  border-2 ${
                      selectedFrame === frame.value
                        ? "border-amber-600"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: frame.color }}
                    title={frame.label}
                  />
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 ">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-2 hover:bg-gray-100"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 text-lg font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-2 hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button className="flex-1 bg-amber-600 text-white px-6 py-3  font-medium hover:bg-blue-700 transition-colors">
                COMMANDER
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 text-sm">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <Heart className="w-4 h-4" />
                <span>Ajouter à la liste de souhaits</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <MessageCircle className="w-4 h-4" />
                <span>Conseil d'un expert ?</span>
              </button>
            </div>

            {/* Social Sharing */}
            <div className="flex items-center space-x-4 text-sm">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <Share2 className="w-4 h-4" />
                <span>Envoyer par WhatsApp</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <Share2 className="w-4 h-4" />
                <span>Partager</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <span>Épinglez-le</span>
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-700">Livraison rapide</span>
              </div>
              <div className="flex items-center space-x-3">
                <RefreshCw className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-700">
                  Satisfait ou remboursé
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-700">Garantie 2 ans</span>
              </div>
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-700">
                  Frais de livraison offerts !
                </span>
              </div>
            </div>

            {/* Product Benefits */}
            <div className="space-y-3 pt-6 border-t">
              <div className="flex items-start space-x-3">
                <Heart className="w-5 h-5 text-blue-600 mt-0.5" />
                <span className="text-sm text-gray-700">
                  Affirmez votre style avec une décoration unique
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <Heart className="w-5 h-5 text-blue-600 mt-0.5" />
                <span className="text-sm text-gray-700">
                  Apportez bien-être et sérénité à votre espace
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <Heart className="w-5 h-5 text-blue-600 mt-0.5" />
                <span className="text-sm text-gray-700">
                  Valorisez la créativité et soutenez l'art et les artistes
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <Heart className="w-5 h-5 text-blue-600 mt-0.5" />
                <span className="text-sm text-gray-700">
                  Obtenez une décoration raffinée et élégante
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
