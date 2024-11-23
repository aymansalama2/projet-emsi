import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <Link to="/"> <h1 className="text-xl font-bold">EMSI Dev Squad</h1></Link>
      {/* Boutons desktop */}
      <div className="hidden sm:flex space-x-4">
        <Link to="/login">
          <button className="px-4 py-2 bg-blue-500 rounded-full hover:bg-blue-400 transition text-sm sm:text-base">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="px-4 py-2 bg-teal-500 rounded-full hover:bg-teal-400 transition text-sm sm:text-base">
            Sign Up
          </button>
        </Link>
      </div>

      {/* Menu mobile */}
      <div className="sm:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="material-icons">menu</span>
        </button>
        {isMenuOpen && (
          <div className="absolute top-16 right-4 bg-gray-800 rounded-lg shadow-lg p-4">
            <Link to="/login">
              <button className="block w-full px-4 py-2 bg-blue-500 rounded-full hover:bg-blue-400 transition text-sm mb-2">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="block w-full px-4 py-2 bg-teal-500 rounded-full hover:bg-teal-400 transition text-sm">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
