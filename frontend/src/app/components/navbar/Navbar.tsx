"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle for mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-teal-500 text-black p-3 border-b-4 border-black retro-navbar">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-3">
          <span className="font-extrabold text-2xl text-yellow-300">
            Unbound Science
          </span>
        </Link>
        <w3m-button />
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-3xl focus:outline-none text-black"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden mt-5 text-center transition-all duration-300 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <w3m-button />
      </div>
    </nav>
  );
};

export default Navbar;
