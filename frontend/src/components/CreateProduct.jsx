import React, { useState, useEffect } from 'react';
import api from '../axios';
import { Upload, PlusCircle, Loader2, CheckCircle } from 'lucide-react';

export default function CreateProduct({ onProductCreated }) {
  const [formData, setFormData] = useState({
    nom: '',
    prix: '',
    note: '',
    promotion: '',
    categorie_id: '',
    image: null
  });
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    api.get('/api/categories')
      .then((res) => setCategories(res.data.categories))
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== '') {
        data.append(key, value);
      }
    });

    try {
      await api.post('/api/produits', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setIsSuccess(true);
      onProductCreated();
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          nom: '',
          prix: '',
          note: '',
          promotion: '',
          categorie_id: '',
          image: null
        });
        setImagePreview(null);
        setIsSuccess(false);
      }, 2000);
      
    } catch (err) {
      console.error('Error creating product:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <PlusCircle className="mr-2 text-blue-600" size={24} />
        Ajouter un nouveau produit
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Product Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Nom du produit</label>
          <input
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="iPhone 13 Pro"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            required
          />
        </div>

        {/* Price and Rating Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Prix (€)</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">€</span>
              <input
                name="prix"
                type="number"
                value={formData.prix}
                onChange={handleChange}
                placeholder="999.99"
                step="0.01"
                min="0"
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Note (0-5)</label>
            <input
              name="note"
              type="number"
              value={formData.note}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
              placeholder="4.5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Promotion and Category Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Promotion (%)</label>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">%</span>
              <input
                name="promotion"
                type="number"
                value={formData.promotion}
                onChange={handleChange}
                placeholder="20"
                min="0"
                max="100"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Catégorie</label>
            <select
              name="categorie_id"
              value={formData.categorie_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.nom}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Image du produit</label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="h-full w-full object-contain rounded-lg" />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Cliquez pour uploader</span> ou glissez-déposez
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG (MAX. 5MB)</p>
                </div>
              )}
              <input 
                type="file" 
                onChange={handleImageChange} 
                className="hidden" 
                accept="image/*"
              />
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading || isSuccess}
            className={`w-full flex justify-center items-center py-3 px-4 rounded-lg font-medium text-white transition-all ${
              isSuccess 
                ? 'bg-green-500' 
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300'
            } ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                Création en cours...
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle className="mr-2" size={18} />
                Produit créé avec succès!
              </>
            ) : (
              'Créer Produit'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}