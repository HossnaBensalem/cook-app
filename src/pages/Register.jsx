import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { BiUser } from 'react-icons/bi';
import { AiOutlineLock } from 'react-icons/ai';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // التحقق من إذا كان البريد الإلكتروني موجودًا بالفعل
      const existing = await axios.get(`http://localhost:3001/users?email=${data.email}`);
      if (existing.data.length > 0) {
        alert('Email déjà utilisé');
        return;
      }

      // إنشاء حساب جديد بناءً على البيانات المدخلة
      await axios.post('http://localhost:3001/users', {
        email: data.email,
        password: data.password,
        role: data.role // تحديد الدور حسب اختيار المستخدم
      });

      alert('Inscription réussie');
      navigate('/login'); // الانتقال إلى صفحة تسجيل الدخول بعد النجاح
    } catch (err) {
      console.error(err);
      alert('Erreur lors de l\'inscription');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-slate-800">
      <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
        <h1 className="text-4xl text-white font-bold text-center mb-6">Register</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative my-4">
            <input
              type="email"
              id="register-email"
              {...register("email", { required: 'Email requis' })}
              className="block w-72 py-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label htmlFor="register-email" className="absolute text-sm text-white transition-all duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Your Email
            </label>
            <BiUser className="absolute top-4 right-4 text-white" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="relative my-4">
            <input
              type="password"
              id="register-password"
              {...register("password", { required: 'Mot de passe requis', minLength: { value: 4, message: 'Minimum 4 caractères' } })}
              className="block w-72 py-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label htmlFor="register-password" className="absolute text-sm text-white transition-all duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Your Password
            </label>
            <AiOutlineLock className="absolute top-4 right-4 text-white" />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* حقل اختيار الدور */}
          <div className="relative my-4">
            <select
              id="register-role"
              {...register("role", { required: 'Rôle requis' })}
              className="block w-72 py-2 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            >
              <option value="user">Utilisateur</option>
              <option value="admin">Administrateur</option>
            </select>
            <label htmlFor="register-role" className="absolute text-sm text-white transition-all duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Select Role
            </label>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>

          <button className="w-full mt-6 mb-4 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300" type="submit">
            Register
          </button>

          <div className="text-center">
            <span className="text-white text-sm">Already have an account? <Link className="text-blue-500" to="/login">Login</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
