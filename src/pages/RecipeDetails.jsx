// pages/RecipeDetails.jsx
import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { BiTrash } from 'react-icons/bi';

const RecipeDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Charger les données
  useEffect(() => {
    fetch(`http://localhost:3001/recipes/${id}`)
      .then(res => res.json())
      .then(data => setRecipe(data));

    fetch(`http://localhost:3001/comments?recipeId=${id}`)
      .then(res => res.json())
      .then(data => setComments(data));
  }, [id]);

  // Soumettre un commentaire
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!user) return;

    fetch('http://localhost:3001/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipeId: id,
        text: newComment,
        userId: user.id,
        userName: user.email.split('@')[0],
        date: new Date().toISOString()
      }),
    }).then(() => {
      setNewComment('');
      fetch(`http://localhost:3001/comments?recipeId=${id}`)
        .then(res => res.json())
        .then(data => setComments(data));
    });
  };

  // Supprimer un commentaire
  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce commentaire ?')) {
      try {
        await fetch(`http://localhost:3001/comments/${commentId}`, {
          method: 'DELETE'
        });
        setComments(comments.filter(c => c.id !== commentId));
      } catch (error) {
        console.error('Erreur:', error);
      }
    }
  };

  if (!recipe) return <div className="text-white text-center py-8">Chargement...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Section de la recette */}
      <div className="bg-slate-800 rounded-lg shadow-xl overflow-hidden">
        <div className="relative h-64 md:h-80">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
            onError={(e) => e.target.src = '/placeholder-food.jpg'}
          />
          <span className="absolute top-3 right-3 bg-slate-900/80 text-emerald-300 px-4 py-1 rounded-full text-sm">
            {recipe.category}
          </span>
        </div>

        <div className="p-6 md:p-8">
          <h1 className="text-3xl font-bold text-emerald-400 mb-4">{recipe.title}</h1>
          <p className="text-gray-300 text-lg mb-6">{recipe.description}</p>

          {/* Informations de préparation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 bg-slate-700/30 p-4 rounded-xl">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Temps</p>
              <p className="text-white font-medium">{recipe.prepTime}h</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm">Difficulté</p>
              <p className="text-white font-medium capitalize">{recipe.difficulty}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm">Portions</p>
              <p className="text-white font-medium">{recipe.servings}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm">Catégorie</p>
              <p className="text-white font-medium">{recipe.category}</p>
            </div>
          </div>

          {/* Ingrédients */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Ingrédients</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recipe.ingredients.map((ingredient, index) => (
                <li 
                  key={index}
                  className="flex items-center bg-slate-700/50 p-3 rounded-lg hover:bg-slate-700/70 transition"
                >
                  <span className="text-emerald-400 mr-3">▹</span>
                  <span className="text-gray-200">{ingredient.trim()}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Étapes */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Préparation</h2>
            <ol className="space-y-4">
              {recipe.steps.map((step, index) => (
                <li 
                  key={index}
                  className="flex items-start bg-slate-700/30 p-4 rounded-xl"
                >
                  <span className="text-emerald-400 text-xl mr-4 min-w-[30px]">{index + 1}.</span>
                  <p className="text-gray-200 flex-1">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Section des commentaires */}
      <div className="mt-8 bg-slate-800 p-6 rounded-lg">
        <h3 className="text-2xl font-bold text-emerald-400 mb-6">
          Commentaires ({comments.length})
        </h3>

        <div className="space-y-4 mb-6">
          {comments.map(comment => (
            <div key={comment.id} className="bg-slate-700 p-4 rounded-lg relative group">
              {(user?.id === comment.userId || user?.role === 'admin') && (
                <button 
                  onClick={() => handleDeleteComment(comment.id)}
                  className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Supprimer le commentaire"
                >
                  <BiTrash className="text-white text-sm" />
                </button>
              )}

              <div className="flex justify-between items-start mb-2">
                <span className="text-emerald-300 font-medium">
                  {comment.userName}
                </span>
                <span className="text-gray-400 text-sm">
                  {new Date(comment.date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <p className="text-gray-200">{comment.text}</p>
            </div>
          ))}
        </div>

        {/* Formulaire de commentaire */}
        {user ? (
          <form onSubmit={handleCommentSubmit} className="space-y-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Votre commentaire..."
              className="w-full bg-slate-700 text-white p-4 rounded-lg focus:ring-2 focus:ring-emerald-400 border-none"
              rows="4"
            />
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg transition-colors font-medium w-full md:w-auto"
            >
              Publier
            </button>
          </form>
        ) : (
          <div className="text-center py-6 bg-slate-700/30 rounded-lg">
            <Link 
              to="/login" 
              className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              Connectez-vous pour commenter
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;