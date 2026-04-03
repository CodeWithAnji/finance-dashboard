import { useState, useContext } from "react";
import { AppContext } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";
import { FiMenu, FiX } from "react-icons/fi"; // Hamburger icon

export default function App() {
  const [page, setPage] = useState("dashboard");
  const { role, setRole } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const navButtons = (
    <div className="flex flex-col md:flex-row gap-6 text-sm font-medium text-gray-300 md:items-center">
      <button
        onClick={() => {
          setPage("dashboard");
          setMenuOpen(false);
        }}
        className="hover:text-purple-400 transition cursor-pointer"
      >
        Dashboard
      </button>
      <button
        onClick={() => {
          setPage("transactions");
          setMenuOpen(false);
        }}
        className="hover:text-purple-400 transition cursor-pointer"
      >
        Transactions
      </button>
      <button
        onClick={() => {
          setPage("insights");
          setMenuOpen(false);
        }}
        className="hover:text-purple-400 transition cursor-pointer"
      >
        Insights
      </button>
    </div>
  );

  return (
    <div className="p-4">
      {/* Navbar */}
      <div className="relative flex items-center justify-between px-4 py-3 bg-[#1e293b] border border-gray-700 shadow-md">
        {/* Left: Hamburger menu on mobile, buttons on desktop */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-300 text-2xl focus:outline-none"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
        <div className="hidden md:flex">{navButtons}</div>

        {/* Centered title */}
        {/* Centered title */}
        <h2 className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-base md:text-xl font-bold text-gray-300 tracking-wide text-center">
          FINANCE DASHBOARD
        </h2>

        {/* Right role toggle */}
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>Viewer</span>
          <button
            onClick={() => setRole(role === "admin" ? "viewer" : "admin")}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 cursor-pointer ${
              role === "admin"
                ? "bg-purple-500 shadow-md shadow-purple-500/40"
                : "bg-gray-600"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ${
                role === "admin" ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
          <span>Admin</span>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#1e293b] flex flex-col gap-2 px-4 py-3 md:hidden border-t border-gray-700 z-20">
            {navButtons}
          </div>
        )}
      </div>

      {/* Page Content */}
      <div className="mt-4">
        {page === "dashboard" && <Dashboard />}
        {page === "transactions" && <Transactions />}
        {page === "insights" && <Insights />}
      </div>
    </div>
  );
}
