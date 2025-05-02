import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useRecipe } from '../contexts/RecipeContext';
import { BiPlus, BiTrash } from 'react-icons/bi';

const AddRecipe = () => {
  const { user } = useAuth();
  const { addRecipe } = useRecipe();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: [''],
    steps: [''],
    category: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    difficulty: 'facile',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const addArrayField = (field) => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeArrayField = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user?.role !== 'admin') return;
    
    try {
      await addRecipe({
        ...formData,
        userId: user.id,
        createdAt: new Date().toISOString()
      });
      navigate('/recipes');
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error);
    }
  };

  if (user?.role !== 'admin') {
    navigate('/recipes');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 p-6">
      <div className="max-w-4xl mx-auto bg-slate-800 border border-slate-400 rounded-lg p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30">
        <h1 className="text-3xl font-bold text-white mb-6">Ajouter une Nouvelle Recette</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Champ Titre */}
          <div className="space-y-2">
            <label className="block text-white text-lg">Titre de la recette</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-500 focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          {/* Champ Description */}
          <div className="space-y-2">
            <label className="block text-white text-lg">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-500 focus:ring-2 focus:ring-emerald-500"
              rows="4"
              required
            />
          </div>

          {/* Ingrédients */}
          <div className="space-y-2">
            <label className="block text-white text-lg">Ingrédients</label>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleArrayChange('ingredients', index, e.target.value)}
                  className="flex-1 p-3 rounded-lg bg-slate-700 text-white border border-slate-500 focus:ring-2 focus:ring-emerald-500"
                  required
                />
                {formData.ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayField('ingredients', index)}
                    className="text-red-500 hover:text-red-400 p-2"
                  >
                    <BiTrash className="text-xl" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField('ingredients')}
              className="flex items-center gap-2 text-emerald-500 hover:text-emerald-400"
            >
              <BiPlus className="text-xl" />
              Ajouter un ingrédient
            </button>
          </div>

          {/* Étapes de préparation */}
          <div className="space-y-2">
            <label className="block text-white text-lg">Étapes de préparation</label>
            {formData.steps.map((step, index) => (
              <div key={index} className="flex gap-2 items-center">
                <textarea
                  value={step}
                  onChange={(e) => handleArrayChange('steps', index, e.target.value)}
                  className="flex-1 p-3 rounded-lg bg-slate-700 text-white border border-slate-500 focus:ring-2 focus:ring-emerald-500"
                  rows="2"
                  required
                />
                {formData.steps.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayField('steps', index)}
                    className="text-red-500 hover:text-red-400 p-2"
                  >
                    <BiTrash className="text-xl" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField('steps')}
              className="flex items-center gap-2 text-emerald-500 hover:text-emerald-400"
            >
              <BiPlus className="text-xl" />
              Ajouter une étape
            </button>
          </div>

          {/* Autres champs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-white text-lg">Catégorie</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-500 focus:ring-2 focus:ring-emerald-500"
                required
              >
                <option value="">Sélectionner une catégorie</option>
                <option value="italien">Italien</option>
                <option value="marocain">Marocain</option>
                <option value="asiatique">Asiatique</option>
                <option value="dessert">Dessert</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-white text-lg">Difficulté</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-500 focus:ring-2 focus:ring-emerald-500"
                required
              >
                <option value="facile">Facile</option>
                <option value="moyen">Moyen</option>
                <option value="difficile">Difficile</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-white text-lg">Temps de préparation (minutes)</label>
              <input
                type="number"
                name="prepTime"
                value={formData.prepTime}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-500 focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-white text-lg">Temps de cuisson (minutes)</label>
              <input
                type="number"
                name="cookTime"
                value={formData.cookTime}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-500 focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-white text-lg">Nombre de portions</label>
              <input
                type="number"
                name="servings"
                value={formData.servings}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-500 focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-white text-lg">URL de l'image</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-500 focus:ring-2 focus:ring-emerald-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          {/* Boutons de soumission */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={() => navigate('/recipes')}
              className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
            >
              Ajouter la Recette
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;