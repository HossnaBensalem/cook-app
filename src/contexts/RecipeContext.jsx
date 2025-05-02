// src/contexts/RecipeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/recipes');
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const addRecipe = async (recipe) => {
    const response = await axios.post('http://localhost:3001/recipes', recipe);
    setRecipes([...recipes, response.data]);
    return response.data;
  };

  const updateRecipe = async (id, updatedRecipe) => {
    const response = await axios.put(`http://localhost:3001/recipes/${id}`, updatedRecipe);
    setRecipes(recipes.map(recipe => recipe.id === id ? response.data : recipe));
    return response.data;
  };

  const deleteRecipe = async (id) => {
    await axios.delete(`http://localhost:3001/recipes/${id}`);
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <RecipeContext.Provider value={{
      recipes,
      loading,
      addRecipe,
      updateRecipe,
      deleteRecipe,
      fetchRecipes
    }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipe = () => useContext(RecipeContext);