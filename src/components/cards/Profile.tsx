import { useAuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const { user, loading, error, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="border border-dashed rounded-md border-gray-300 p-4">
      <div>
        <h1>Welcome, {user?.email}</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
