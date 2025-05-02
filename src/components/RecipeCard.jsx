import React from 'react';
import { Link } from 'react-router-dom';
import { BiEdit, BiTrash } from 'react-icons/bi';

const RecipeCard = ({ recipe, canEdit, onDelete }) => {
  return (
    <div className="bg-slate-800 border border-slate-400 rounded-lg overflow-hidden shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 transition-transform hover:scale-[1.02] h-full flex flex-col group">
      {/* Badge de catégorie */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={recipe.image || '/placeholder-food.jpg'} 
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.src = '/placeholder-food.jpg';
          }}
        />
        <span className="absolute top-2 right-2 bg-slate-900/80 text-emerald-300 text-xs px-3 py-1 rounded-full capitalize font-medium">
          {recipe.category}
        </span>
      </div>

      {/* Contenu de la carte */}
      <div className="p-6 flex flex-col flex-grow">
        {/* En-tête avec actions admin */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white truncate pr-2">{recipe.title}</h3>
          
          {canEdit && (
            <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Link
                to={`/edit-recipe/${recipe.id}`}
                className="text-emerald-400 hover:text-emerald-300 transition-colors tooltip"
                data-tooltip="Modifier"
              >
                <BiEdit className="text-xl" />
              </Link>
              <button
                onClick={onDelete}
                className="text-red-400 hover:text-red-300 transition-colors tooltip"
                data-tooltip="Supprimer"
              >
                <BiTrash className="text-xl" />
              </button>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-300 mb-4 line-clamp-3 flex-grow text-sm leading-relaxed">
          {recipe.description}
        </p>

        {/* Ingrédients et lien */}
        <div className="mt-auto space-y-3">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-emerald-400">Ingrédients clés :</h4>
            <div className="flex flex-wrap gap-2">
              {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                <span 
                  key={index}
                  className="px-2.5 py-1 bg-slate-700/50 text-gray-200 rounded-full text-xs font-medium"
                >
                  {ingredient}
                </span>
              ))}
              {recipe.ingredients.length > 3 && (
                <span className="px-2.5 py-1 bg-slate-700/50 text-gray-200 rounded-full text-xs font-medium">
                  +{recipe.ingredients.length - 3}
                </span>
              )}
            </div>
          </div>

          <Link
            to={`/recipes/${recipe.id}`}
            className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
          >
            Voir la recette complète
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mt-0.5"
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;