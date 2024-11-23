import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/logo.jpg'; // Si l'image est dans le dossier src/assets

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full bg-gray-900 text-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <img
          src={logo}
          alt="Logo EMSI Dev Squad"
          className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-4 border-teal-500 shadow-lg"
        />
        <h1 className="text-lg sm:text-2xl font-bold text-gradient hidden sm:block">
          EMSI Dev Squad
        </h1>

        {/* Desktop Navigation Links */}
        <nav className="hidden sm:flex space-x-6">
          <a href="#features" className="hover:text-teal-400 transition text-sm sm:text-base">
            Fonctionnalités
          </a>
          <a href="#projects" className="hover:text-teal-400 transition text-sm sm:text-base">
            Projets
          </a>
          <a href="#about" className="hover:text-teal-400 transition text-sm sm:text-base">
            À propos
          </a>
          <a href="#contact" className="hover:text-teal-400 transition text-sm sm:text-base">
            Contact
          </a>
        </nav>

        {/* Login & Sign Up Buttons (Desktop) */}
        <div className="hidden sm:flex space-x-4">
          <button className="px-4 py-2 bg-blue-500 rounded-full hover:bg-blue-400 transition text-sm sm:text-base">
            Login
          </button>
          <button className="px-4 py-2 bg-teal-500 rounded-full hover:bg-teal-400 transition text-sm sm:text-base">
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="bg-gray-800 sm:hidden">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li>
              <a href="#features" className="text-white hover:text-teal-400 text-lg">
                Fonctionnalités
              </a>
            </li>
            <li>
              <a href="#projects" className="text-white hover:text-teal-400 text-lg">
                Projets
              </a>
            </li>
            <li>
              <a href="#about" className="text-white hover:text-teal-400 text-lg">
                À propos
              </a>
            </li>
            <li>
              <a href="#contact" className="text-white hover:text-teal-400 text-lg">
                Contact
              </a>
            </li>
            <li>
              <button className="px-4 py-2 bg-blue-500 rounded-full hover:bg-blue-400 transition text-lg">
                Login
              </button>
            </li>
            <li>
              <button className="px-4 py-2 bg-teal-500 rounded-full hover:bg-teal-400 transition text-lg">
                Sign Up
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
