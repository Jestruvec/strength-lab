import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home, Login, NotFound, Settings, Train, Profile } from "./pages";
import { AuthProvider, useAuthContext } from "@/context";
import { MainLayout } from "@/components";

export default function App() {
  return (
    <AuthProvider>
      <Router basename="/strength-lab">
        <Routes>
          {/* Redirigir la ruta raíz "/" a "/login" */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Ruta de login (pública) */}
          <Route path="/login" element={<Login />} />

          {/* Rutas privadas (con layout) */}
          <Route
            path="/app" // Cambia la ruta base de las rutas privadas
            element={
              <PrivateRoute>
                <MainLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Home />} />{" "}
            {/* Ruta raíz dentro del layout */}
            <Route path="home" element={<Home />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
            <Route path="train" element={<Train />} />
          </Route>

          {/* Ruta para páginas no encontradas */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// Componente para proteger rutas privadas
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthContext(); // Obtén el estado de autenticación

  if (!user) {
    // Si el usuario no está autenticado, redirige a /login
    return <Navigate to="/login" replace />;
  }

  // Si el usuario está autenticado, renderiza el layout y sus hijos
  return <>{children}</>;
};
