import React, { useState, useEffect } from 'react';
import api from '../axios';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';

const CategoryManager = ({ onChange }) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const fetchCategories = async () => {
    try {
      const response = await api.get('/api/categories');
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async () => {
    if (!newCategory.trim()) return;
    try {
      await api.post('/api/categories', { nom: newCategory });
      setNewCategory('');
      fetchCategories();
      onChange(); // ✅ use the prop here
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/categories/${id}`);
      fetchCategories();
      onChange(); // ✅ use the prop here
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const startEditing = (category) => {
    setEditingId(category.id);
    setEditValue(category.nom);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditValue('');
  };

  const handleUpdate = async (id) => {
    try {
      await api.put(`/api/categories/${id}`, { nom: editValue });
      setEditingId(null);
      fetchCategories();
      onChange(); // ✅ use the prop here
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Category Management</h2>
      
      <div className="flex mb-8">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter category name"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleCreate}
          className="bg-green-600 text-white px-4 py-2 rounded-r-lg hover:bg-green-700 transition-colors flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Add Category
        </button>
      </div>

      <div className="space-y-3">
        {categories.length === 0 ? (
          <p className="text-gray-500">No categories found</p>
        ) : (
          categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              {editingId === category.id ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="flex-1 px-3 py-1 border border-gray-300 rounded"
                  />
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleUpdate(category.id)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded"
                      title="Save"
                    >
                      <Save size={18} />
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="p-2 text-gray-600 hover:bg-gray-50 rounded"
                      title="Cancel"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-gray-800">{category.nom}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEditing(category)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryManager;
