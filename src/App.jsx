import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { RecipeProvider } from "./contexts/RecipeContext";
import { FilterProvider } from "./contexts/FilterContext";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import "./index.css";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RecipeProvider>
          <FilterProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow p-4 bg-gradient-to-br from-gray-900 to-slate-800">
                <AppRoutes />
              </main>
            </div>
          </FilterProvider>
        </RecipeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App; // التصدير الافتراضي