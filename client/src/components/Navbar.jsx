import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Kinbechlogo from "../../src/images/kinbechLogo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => navigate("/")}
        >
          <img src={Kinbechlogo} alt="Kinbech" className="w-9 h-9 object-contain" />
          <span className="text-xl font-bold text-gray-900 tracking-tight">
            Kin<span className="text-[#14ae5c]">bech</span>
          </span>
        </div>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link to="/aboutus" className="hover:text-[#14ae5c] transition-colors">About</Link>
          <Link to="/contactus" className="hover:text-[#14ae5c] transition-colors">Contact</Link>
        </nav>

        {/* CTA buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-semibold text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 text-sm font-semibold text-white bg-[#14ae5c] rounded-lg hover:bg-[#119e52] transition-colors"
          >
            Sign up free
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 flex flex-col gap-3 text-sm font-medium">
          <Link to="/aboutus" className="text-gray-700 hover:text-[#14ae5c]" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/contactus" className="text-gray-700 hover:text-[#14ae5c]" onClick={() => setMenuOpen(false)}>Contact</Link>
          <hr className="border-gray-100" />
          <Link to="/login" className="text-gray-700 hover:text-[#14ae5c]" onClick={() => setMenuOpen(false)}>Log in</Link>
          <Link
            to="/signup"
            className="text-center py-2 text-white bg-[#14ae5c] rounded-lg hover:bg-[#119e52]"
            onClick={() => setMenuOpen(false)}
          >
            Sign up free
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
