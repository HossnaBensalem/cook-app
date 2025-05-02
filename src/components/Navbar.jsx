// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useFilter } from '../contexts/FilterContext';
import { BiUser, BiLogOut, BiSearchAlt, BiFoodMenu } from 'react-icons/bi';
import { Dropdown } from 'react-bootstrap';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { searchTerm, setSearchTerm, categoryFilter, setCategoryFilter } = useFilter();
  const navigate = useNavigate();
  
  const categories = ['Tous', 'italien', 'dessert', 'végétarien', 'asiatique', 'rapide'];

  const handleLogout = () => {
    logout();
    navigate('/recipes');
    window.location.reload(); // لتحديث الصفحة بعد تسجيل الخروج
  };

  return (
    <nav className="bg-slate-800 border-b border-slate-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* الجزء الأيسر - الشعار والبحث */}
          <div className="flex items-center gap-6 flex-1">
            <Link to="/recipes" className="flex items-center gap-2">
              <span className="text-white text-xl font-bold">CookSecure</span>
            </Link>

            <div className="hidden md:flex items-center gap-4 flex-1 max-w-xl">
              <div className="relative flex-1">
                <BiSearchAlt className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher..."
                  className="w-full pl-10 pr-3 py-2 rounded-lg bg-slate-700 text-white border border-slate-500 focus:outline-none"
                />
              </div>

              <div className="relative flex items-center">
                <BiFoodMenu className="mr-2 text-gray-400" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="py-2 pl-3 pr-8 rounded-lg bg-slate-700 text-white border border-slate-500 focus:outline-none"
                >
                  <option value="">Toutes catégories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* الجزء الأيمن - إدارة الحساب */}
          <Dropdown>
            <Dropdown.Toggle variant="dark" className="bg-transparent border-0 p-0">
              <BiUser className="text-2xl text-white hover:text-emerald-400 cursor-pointer" />
            </Dropdown.Toggle>

            <Dropdown.Menu className="bg-slate-700 border border-slate-500">
              {user ? (
                <>
         
                  <Dropdown.Item 
                    onClick={handleLogout}
                    className="text-red-400 hover:bg-slate-600"
                  >
                    Déconnexion
                  </Dropdown.Item>
                </>
              ) : (
                <>
                  <Dropdown.Item 
                    onClick={() => navigate('/login')}
                    className="text-white hover:bg-slate-600"
                  >
                    Connexion
                  </Dropdown.Item>
                  <Dropdown.Item 
                    onClick={() => navigate('/register')}
                    className="text-white hover:bg-slate-600"
                  >
                    Créer un compte
                  </Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;