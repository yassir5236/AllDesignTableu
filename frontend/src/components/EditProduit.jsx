

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../axios";
import { ArrowLeft, Loader2, Save } from "lucide-react";

const EditProduit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    nom: "",
    prix: "",
    note: "",
    promotion: "",
    categorie_id: "",
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [produitRes, categoriesRes] = await Promise.all([
          api.get(`/api/produits/${id}`),
          api.get("/api/categories"),
        ]);

        console.log("Produit data:", produitRes.data.produit);

        setFormData({
          nom: produitRes.data.produit.nom || "",
          prix: produitRes.data.produit.prix
            ? produitRes.data.produit.prix.toString()
            : "",
          note: produitRes.data.produit.note
            ? produitRes.data.produit.note.toString()
            : "",
          promotion: produitRes.data.produit.promotion
            ? produitRes.data.produit.promotion.toString()
            : "",
          categorie_id: produitRes.data.produit.categorie_id
            ? produitRes.data.produit.categorie_id.toString()
            : "",
        });

        if (produitRes.data.produit.image) {
          setImagePreview(
            `http://localhost:8000/storage/${produitRes.data.produit.image}`
          );
        }

        setCategories(categoriesRes.data.categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field ${name} changed to:`, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Debug: Log the formData before processing
      console.log("FormData before processing:", formData);

      // Validate required fields on frontend
      if (!formData.nom || !formData.nom.trim()) {
        alert("Le nom du produit est requis");
        setIsSubmitting(false);
        return;
      }

      if (!formData.prix || parseFloat(formData.prix) <= 0) {
        alert("Le prix doit être supérieur à 0");
        setIsSubmitting(false);
        return;
      }

      if (!formData.categorie_id) {
        alert("La catégorie est requise");
        setIsSubmitting(false);
        return;
      }

      const data = new FormData();

      // IMPORTANT: Add _method field for Laravel to handle PUT with multipart/form-data
      data.append("_method", "PUT");

      // Always append required fields
      data.append("nom", formData.nom.trim());
      data.append("prix", parseFloat(formData.prix));
      data.append("categorie_id", formData.categorie_id);

      // Optional fields - only append if they have values
      if (formData.note && formData.note.trim() !== "") {
        data.append("note", parseInt(formData.note));
      }

      if (formData.promotion && formData.promotion.trim() !== "") {
        data.append("promotion", parseInt(formData.promotion));
      }

      if (imageFile) {
        data.append("image", imageFile);
      }

      // Debug: Log what's being sent
      console.log("Data being sent:");
      for (let [key, value] of data.entries()) {
        console.log(key, value);
      }

      // Use POST instead of PUT when sending FormData with files
      const response = await api.post(`/api/produits/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Success response:", response.data);
      navigate(`/categorie/${formData.categorie_id}`);
    } catch (error) {
      console.error("Update error:", error);
      console.error("Error response:", error.response?.data);

      if (error.response?.data?.errors) {
        alert(
          "Validation errors:\n" +
            Object.entries(error.response.data.errors)
              .map(([field, errors]) => `${field}: ${errors.join(", ")}`)
              .join("\n")
        );
      } else {
        alert("Une erreur est survenue lors de la mise à jour");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">
          Modifier le produit
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm p-6 space-y-6"
      >
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Image du produit
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors overflow-hidden">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-5">
                  <span className="text-gray-500 text-sm">
                    Cliquez pour télécharger une image
                  </span>
                  <span className="text-gray-400 text-xs">
                    PNG, JPG (MAX. 5MB)
                  </span>
                </div>
              )}
              <input
                type="file"
                onChange={handleImageChange}
                className="hidden"
                accept="image/png,image/jpeg,image/webp"
              />
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Nom du produit *
          </label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Nom du produit"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Prix (DH) *
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                DH
              </span>
              <input
                type="number"
                name="prix"
                value={formData.prix}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Note (0-5)
            </label>
            <input
              type="number"
              name="note"
              value={formData.note}
              onChange={handleChange}
              min="0"
              max="5"
              step="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Promotion (%)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                %
              </span>
              <input
                type="number"
                name="promotion"
                value={formData.promotion}
                onChange={handleChange}
                placeholder="0"
                min="0"
                max="100"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Catégorie *
            </label>
            <select
              name="categorie_id"
              value={formData.categorie_id}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="">-- Sélectionnez une catégorie --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nom}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center items-center py-3 px-4 rounded-lg font-medium text-white transition-all ${
              isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Enregistrement...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer les modifications
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduit;
