import { useState } from "react";
import { AppContext } from "./context/AppContext";
import Navbar from "../src/pages/Navbar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";

export default function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className=" bg-[#0f172a] text-white">
      {/* Navbar */}
      <Navbar page={page} setPage={setPage} />

      {/* Page Content */}
      <main className="p-4">
        {page === "dashboard" && <Dashboard />}
        {page === "transactions" && <Transactions />}
        {page === "insights" && <Insights />}
      </main>
    </div>
  );
}
