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
import api from "../axios";

const ProductDetail2 = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFrame, setSelectedFrame] = useState("");
  const [selectedQuality, setSelectedQuality] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const res = await api.get(`/api/produits/${id}`);
        const data = res.data.produit;

        console.log("🚀 Produit reçu depuis l'API:", data); // 🔍 Add this line

        const resolvedImages = data.image
          ? [`http://localhost:8000/storage/${data.image}`]
          : [];

        setProduct({
          ...data,
          prix: Number(data.prix),
          promotion: Number(data.promotion),
          images: resolvedImages,
        });

        if (data.sizes?.length > 0) setSelectedSize(data.sizes[0].value);
        if (data.frames?.length > 0) setSelectedFrame(data.frames[0].value);
        if (data.qualities?.length > 0) setSelectedQuality(data.qualities[0]);
      } catch (err) {
        console.error("❌ Erreur produit:", err); // Error detail
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageNavigation = (direction) => {
    if (!product) return;
    const total = product.images.length;
    const nextIndex =
      direction === "next"
        ? (currentImageIndex + 1) % total
        : (currentImageIndex - 1 + total) % total;
    setCurrentImageIndex(nextIndex);
  };

  const handleQuantityChange = (delta) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const calculatePrice = () => {
    if (!product) return 0;
    let price = product.prix;

    if (selectedSize === "100x100") price += 100;
    if (selectedSize === "120x120") price += 200;

    if (selectedQuality === "Standard") price -= 50;

    // ➕ Add frame price if selected
    if (selectedFrame && selectedFrame !== "none") price += 120;

    // Promotion
    if (product.promotion) price *= 1 - product.promotion / 100;

    return price.toFixed(2);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-amber-500 text-amber-500" : "text-gray-300"
        }`}
      />
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-24 w-24 border-4 border-amber-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Produit non trouvé
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:underline"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  const FRAME_OPTIONS = [
    {
      label: "Sans Cadre",
      value: "none",
      image: "/images/sansCadre.png",
    },
    {
      label: "Cadre Doré",
      value: "black",
      image: "/images/black.png",
    },
    {
      label: "Cadre Noir",
      value: "dore",
      image: "/images/dore.png",
    },
    {
      label: "Cadre Bois",
      value: "wood",
      image: "/images/naturel.png",
    },
  ];

  const SIZES = [
    { label: "L60 x H60 cm", value: "60x60", selected: true },
    { label: "L100 x H100 cm", value: "100x100", selected: false },
    { label: "L120 x H120 cm", value: "120x120", selected: false },
  ];

  const QUALITIES = [{ label: "Premium" }];
  return (
    <div>
      <Header
        bgColor="orange"
        textColor="black"
        textColorCategory="black"
        isScrolled={isScrolled}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative bg-gray-100 aspect-square overflow-hidden">
              <img
                src={product.images[currentImageIndex]}
                onError={(e) => {
                  e.target.src = "/images/apropo.jpg"; // fallback local image
                }}
                alt={product.nom}
                className="w-full h-full object-cover"
              />
              {product.promotion && (
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  -{product.promotion}%
                </div>
              )}

              <button
                onClick={() => handleImageNavigation("prev")}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => handleImageNavigation("next")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex space-x-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`w-20 h-20 overflow-hidden border-2 ${
                    i === currentImageIndex
                      ? "border-amber-600"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={img}
                    alt={`thumb-${i}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.nom}</h1>
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex">{renderStars(product.note)}</div>
                <span className="text-sm text-gray-500">
                  ({product.reviews || 1})
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">
                {calculatePrice()} dh
              </span>
              {product.promotion && (
                <span className="line-through text-gray-400 text-lg">
                  {product.prix.toFixed(2)} dh
                </span>
              )}
            </div>

            <p className="text-gray-600">{product.description}</p>

            {/* Customization Options */}
            {/* Size Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Taille:{" "}
                {product.sizes?.find((s) => s.value === selectedSize)?.label ||
                  SIZES.find((s) => s.value === selectedSize)?.label ||
                  "Select"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {(product.sizes || SIZES).map((size) => (
                  <button
                    key={size.value}
                    onClick={() => setSelectedSize(size.value)}
                    className={`px-4 py-2 border text-sm font-medium transition-all duration-200 ease-out ${
                      selectedSize === size.value
                        ? "bg-amber-600 text-white border-amber-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quality Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Qualité : {selectedQuality || "Select"}
              </h3>
              <div className="flex gap-2">
                {(product.qualities || QUALITIES).map((quality) => {
                  const qualityLabel =
                    typeof quality === "string" ? quality : quality.label;
                  const qualityValue =
                    typeof quality === "string"
                      ? quality
                      : quality.value || quality.label;

                  return (
                    <button
                      key={qualityValue}
                      onClick={() => setSelectedQuality(qualityValue)}
                      className={`px-4 py-2 border text-sm font-medium transition-all duration-200 ease-out ${
                        selectedQuality === qualityValue
                          ? "bg-amber-600 text-white border-amber-600"
                          : "bg-amber-600 text-white border-amber-600"
                      }`}
                    >
                      {qualityLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Frame Selection (Static Options) */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Cadre :{" "}
                {FRAME_OPTIONS.find((f) => f.value === selectedFrame)?.label ||
                  ""}
              </h3>
              <div className="flex space-x-4">
                {FRAME_OPTIONS.map((frame) => (
                  <button
                    key={frame.value}
                    onClick={() => setSelectedFrame(frame.value)}
                    className={`relative w-20 h-20 overflow-hidden border-2 transition-all duration-300 ease-in-out transform hover:scale-105 ${
                      selectedFrame === frame.value
                        ? "border-amber-600"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <img
                      src={frame.image}
                      alt={frame.label}
                      className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                    />
                    {selectedFrame === frame.value && (
                      <div className="absolute inset-0"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Command Button */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-2"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4">{quantity}</span>
                <button onClick={() => handleQuantityChange(1)} className="p-2">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button className="bg-amber-600 rounded-md text-white px-6 py-3 font-medium hover:bg-amber-700 transition w-full">
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

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-3">
                <Truck className="text-blue-600" />
                <span>Livraison rapide</span>
              </div>
              <div className="flex items-center space-x-3">
                <RefreshCw className="text-blue-600" />
                <span>Satisfait ou remboursé</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="text-blue-600" />
                <span>Garantie 2 ans</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail2;
