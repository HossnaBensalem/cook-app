import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Recipes from '../pages/Recipes';
import RecipeDetails from '../pages/RecipeDetails'; // <-- استيراد المكون الجديد
import EditRecipe from '../pages/EditRecipe';
import AdminDashboard from '../pages/AdminDashboard';
import ProtectedRoute from '../components/ProtectedRoute';
import RoleProtectedRoute from '../components/RoleProtectedRoute';
import AddRecipe from '../pages/AddRecipe';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* المسارات العامة */}
      <Route path="/" element={<Recipes />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/recipes/:id" element={<RecipeDetails />} /> {/* <-- المسار المضاف */}
      <Route path="/add-recipe" element={<AddRecipe />} />

      {/* المسارات المحمية */}
      <Route element={<ProtectedRoute />}>
        <Route path="/edit-recipe/:id" element={<EditRecipe />} />
      </Route>

      {/* مسارات المسؤولين */}
      <Route element={<RoleProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;