import { useState } from "react";

interface ComponentProps {
  icon: React.ReactNode; // El icono va aquí
  title: string; // Título del menú
  content: React.ReactNode; // El contenido que irá debajo del h1
}

export const CustomMenu = ({ icon, title, content }: ComponentProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <button onClick={toggleMenu} className="cursor-pointer relative">
      {/* Aquí es donde se muestra el icono */}
      <span className="h-4 w-4">{icon}</span>

      {showMenu && (
        <div className="absolute overflow-hidden shadow-md rounded-md text-black bg-white top-6 right-0">
          {/* El título del menú */}
          <h1 className="text-xs font-bold">{title}</h1>

          {/* El contenido que se pasa como prop `content` */}
          <div>{content}</div>
        </div>
      )}
    </button>
  );
};
