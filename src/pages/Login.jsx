import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { BiUser, BiLock } from 'react-icons/bi';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');

  const onSubmit = async (data) => {
    setLoginError('');
    const result = await login(data.email, data.password);
    
    if (result.success) {
      if (result.user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/recipes');
      }
    } else {
      setLoginError(result.message || 'Échec de la connexion. Veuillez réessayer.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-slate-800">
      <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
        <h1 className="text-4xl text-white font-bold text-center mb-6">Connexion</h1>
        
        {loginError && (
          <div className="mb-4 p-3 bg-red-500 text-white rounded-md">
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative my-4">
            <input
              type="email"
              id="email"
              {...register("email", { 
                required: 'Email requis',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email invalide'
                }
              })}
              className="block w-72 py-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label htmlFor="email" className="absolute text-sm text-white transition-all duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Votre Email
            </label>
            <BiUser className="absolute top-4 right-4 text-white" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="relative my-4">
            <input
              type="password"
              id="password"
              {...register("password", { 
                required: 'Mot de passe requis',
                minLength: {
                  value: 4,
                  message: 'Minimum 4 caractères'
                }
              })}
              className="block w-72 py-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label htmlFor="password" className="absolute text-sm text-white transition-all duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Votre Mot de passe
            </label>
            <BiLock className="absolute top-4 right-4 text-white" />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="text-white text-sm">Admin</label>
            </div>
           
          </div>

          <button className="w-full mt-6 mb-4 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300" type="submit">
            Se connecter
          </button>

          <div className="text-center">
            <span className="text-white text-sm">Nouveau ici? <Link className="text-blue-500" to="/register">Créer un compte</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;