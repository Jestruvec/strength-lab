import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  Home,
  Login,
  NotFound,
  Settings,
  Train,
  Profile,
  Routines,
} from "./pages";
import { AuthProvider, useAuthContext } from "@/context";
import { MainLayout } from "@/components";

export default function App() {
  return (
    <AuthProvider>
      <Router basename="/strength-lab">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Home />} />{" "}
            <Route path="home" element={<Home />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/:profileId" element={<Profile />} />
            <Route path="train" element={<Train />} />
            <Route path="routines" element={<Routines />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
