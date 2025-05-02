// Recipes.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useRecipe } from '../contexts/RecipeContext';
import { useFilter } from '../contexts/FilterContext';
import RecipeCard from '../components/RecipeCard';

const Recipes = () => {
  const { user } = useAuth();
  const { recipes, loading, deleteRecipe } = useRecipe();
  const { searchTerm, categoryFilter } = useFilter();
  const navigate = useNavigate();

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === '' || recipe.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
      await deleteRecipe(id);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-slate-800">
        <div className="text-white text-xl">Chargement en cours...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Nos Recettes Culinaires</h1>
          {/* Afficher le bouton uniquement pour les admins */}
          {user?.role === 'admin' && (
            <button
              onClick={() => navigate('/add-recipe')}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-full transition flex items-center gap-2"
            >
              <span>+</span> Ajouter une recette
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map(recipe => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe} 
              canEdit={user?.id === recipe.userId || user?.role === 'admin'}
              onDelete={() => handleDelete(recipe.id)}
            />
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-white">
              {searchTerm || categoryFilter 
                ? "Aucune recette ne correspond à votre recherche" 
                : "Aucune recette disponible pour le moment"}
            </p>
            {/* Afficher le bouton uniquement pour les admins */}
            {user?.role === 'admin' && (
              <button
                onClick={() => navigate('/add-recipe')}
                className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-full transition"
              >
                Soyez le premier à partager !
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;