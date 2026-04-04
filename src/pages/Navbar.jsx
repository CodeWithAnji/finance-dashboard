import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar({ page, setPage }) {
  const { role, setRole } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const navButtons = (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-sm font-medium text-gray-300 md:items-center">
      {["dashboard", "transactions", "insights"].map((p) => (
        <button
          key={p}
          onClick={() => {
            setPage(p);
            setMenuOpen(false);
          }}
          className={`hover:text-purple-400 transition cursor-pointer ${
            page === p ? "text-purple-400 font-semibold" : ""
          }`}
        >
          {p.charAt(0).toUpperCase() + p.slice(1)}
        </button>
      ))}
    </div>
  );

  return (
    <nav className="relative flex items-center justify-between bg-[#1e293b] border-b border-gray-700 px-4 py-3 shadow-md">
      {/* Left: Hamburger menu for mobile */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-300 text-2xl focus:outline-none"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Center: Title */}
      <h1
        className="
    text-sm sm:text-base md:text-xl font-bold text-gray-300 tracking-wide truncate
    max-w-[60%]

    /* Mobile: normal flow (left aligned) */
    static text-left ml-2

    /* Desktop: center it */
    md:absolute md:left-1/2 md:top-1/2 
    md:-translate-x-1/2 md:-translate-y-1/2 md:text-center
  "
      >
        FINANCE DASHBOARD
      </h1>

      {/* Right: Desktop nav */}
      <div className="hidden md:flex">{navButtons}</div>

      {/* Right: Role toggle */}
      {/* Right: Role toggle */}
      <div className="ml-auto flex items-center">
        <button
          onClick={() => setRole(role === "admin" ? "viewer" : "admin")}
          className="relative flex items-center w-24 h-8 bg-gray-700 rounded-full text-xs font-semibold overflow-hidden cursor-pointer select-none"
        >
          {/* Background highlight */}
          <div
            className={`absolute top-0 left-0 h-full w-1/2 bg-purple-500 rounded-full transition-transform duration-300 ${
              role === "admin" ? "translate-x-full" : "translate-x-0"
            }`}
          ></div>

          {/* Labels */}
          <span
            className={`flex-1 text-center z-10 transition-colors duration-300 ${
              role === "admin" ? "text-gray-300" : "text-white"
            }`}
          >
            User
          </span>
          <span
            className={`flex-1 text-center z-10 transition-colors duration-300 ${
              role === "admin" ? "text-white" : "text-gray-300"
            }`}
          >
            Admin
          </span>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#1e293b] flex flex-col gap-2 px-4 py-3 md:hidden border-t border-gray-700 z-20">
          {navButtons}
        </div>
      )}
    </nav>
  );
}
