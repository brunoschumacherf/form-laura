import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark";
  });

  useEffect(() => {
    document.body.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleDarkMode = () => setIsDark((prev) => !prev);

  return (
    <nav className="w-full px-6 py-4 bg-gradient-to-r from-blue-800 to-blue-700 dark:from-gray-900 dark:to-gray-800 text-white shadow-md flex justify-between items-center">
      <button
        onClick={toggleDarkMode}
        className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 shadow-md
                   bg-gradient-to-tr from-yellow-300 to-yellow-400 text-blue-900 
                   dark:from-gray-700 dark:to-gray-600 dark:text-white 
                   hover:scale-105 hover:brightness-110"
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
        {isDark ? "Modo Claro" : "Modo Escuro"}
      </button>
    </nav>
  );
};
