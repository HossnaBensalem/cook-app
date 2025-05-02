import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useRecipe } from '../contexts/RecipeContext'; // المسار الصحيح

const EditRecipe = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { recipes, updateRecipe } = useRecipe();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/recipes');
      return;
    }

    const recipe = recipes.find(r => r.id === id);
    if (recipe) setFormData(recipe);
    else navigate('/recipes');
  }, [id, user, recipes, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData || user?.role !== 'admin') return;

    try {
      await updateRecipe(id, formData);
      navigate('/recipes');
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  if (!formData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 p-6">
      {/* Formulaire d'édition détaillé */}
    </div>
  );
};

export default EditRecipe;