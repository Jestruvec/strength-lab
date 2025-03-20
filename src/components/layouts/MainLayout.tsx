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
import { FriendshipRequestMenu } from "../menus/FriendshipRequestMenu";

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

      <div className="flex gap-8">
        <FriendshipRequestMenu />

        <button onClick={handleLogout} className="cursor-pointer">
          <FaSignOutAlt className="h-4 w-4 text-red-500" />
        </button>
      </div>
    </header>
  );
};

const Sidebar = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  const navItems = [
    { label: "Inicio", icon: <FaHome />, url: "/" },
    { label: "Rutinas", icon: <FaBook />, url: "/routines" },
    { label: "Entrenar", icon: <FaDumbbell />, url: "/train" },
    { label: "Perfil", icon: <FaUser />, url: "/profile" },
    { label: "Configuracion", icon: <FaCog />, url: "/settings" },
  ];

  return (
    <aside
      className={`bg-gray-700 z-10 text-white w-full lg:w-64 fixed bottom-0 lg:top-16 overflow-y-auto transform transition-transform duration-200 ease-in-out ${
        isSidebarOpen
          ? "translate-x-0"
          : "translate-y-full lg:-translate-x-full lg:translate-y-0"
      } md:translate-x-0`}
    >
      <nav>
        <ul>
          {navItems.map((item, index) => {
            return (
              <li
                key={index}
                className="mb-2 p-2 hover:bg-gray-600 cursor-pointer"
              >
                <Link
                  to={item.url}
                  className="hover:text-gray-300 flex items-center gap-2"
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            );
          })}
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
        className={`fixed w-screen overflow-auto p-4 top-16 transform transition-transform duration-200 ease-in-out 
        ${
          isSidebarOpen
            ? "lg:translate-x-64 lg:w-[calc(100vw-256px)]"
            : "lg:-translate-x-0"
        }
        `}
      >
        <Outlet />
      </main>
    </div>
  );
};
