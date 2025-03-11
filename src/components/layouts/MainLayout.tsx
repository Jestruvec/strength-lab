import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context";
import {
  FaBars,
  FaSignOutAlt,
  FaDumbbell,
  FaHome,
  FaUser,
  FaCog,
  FaBook,
} from "react-icons/fa";

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 text-white p-4 fixed h-16 top-0 left-0 right-0 z-10 flex justify-between items-center">
      <button onClick={toggleSidebar} className="cursor-pointer">
        <FaBars className="h-4 w-4 " />
      </button>

      <button onClick={handleLogout} className="cursor-pointer">
        <FaSignOutAlt className="h-4 w-4 text-red-500" />
      </button>
    </header>
  );
};

const Sidebar = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  return (
    <aside
      className={`bg-gray-700 z-10 text-white w-full lg:w-64 fixed bottom-0 lg:top-16 lg:h-full overflow-y-auto transform transition-transform duration-200 ease-in-out ${
        isSidebarOpen
          ? "translate-x-0"
          : "translate-y-full lg:-translate-x-full lg:translate-y-0"
      } md:translate-x-0`}
    >
      <nav>
        <ul>
          <li className="mb-2 p-2 hover:bg-gray-600 cursor-pointer">
            <Link
              to="/"
              className="hover:text-gray-300 flex items-center gap-2"
            >
              <FaHome />
              Inicio
            </Link>
          </li>
          <li className="mb-2 p-2 hover:bg-gray-600 cursor-pointer ">
            <Link
              to="/routines"
              className="hover:text-gray-300 flex gap-2 items-center"
            >
              <FaBook />
              Rutinas
            </Link>
          </li>
          <li className="mb-2 p-2 hover:bg-gray-600 cursor-pointer ">
            <Link
              to="/train"
              className="hover:text-gray-300 flex gap-2 items-center"
            >
              <FaDumbbell />
              Entrenar
            </Link>
          </li>
          <li className="mb-2 p-2 hover:bg-gray-600 cursor-pointer">
            <Link
              to="/profile"
              className="hover:text-gray-300 flex items-center gap-2"
            >
              <FaUser />
              Perfil
            </Link>
          </li>
          <li className="mb-2 p-2 hover:bg-gray-600 cursor-pointer">
            <Link
              to="/settings"
              className="hover:text-gray-300 flex items-center gap-2"
            >
              <FaCog />
              Configuracion
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <main
        className={`fixed lg:h-[54.5rem] w-[100vw] overflow-auto p-4 top-16 transform transition-transform duration-200 ease-in-out 
        ${
          isSidebarOpen
            ? "lg:translate-x-64 h-[37rem] lg:w-[calc(100vw-256px)]"
            : "lg:-translate-x-0 h-[49rem]"
        }
        `}
      >
        <Outlet />
      </main>
    </div>
  );
};
