import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";

const BASE_URL = "https://69cd4dacddc3cabb7bd27ae9.mockapi.io/api/fin";

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [role, setRole] = useState("viewer");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  // ✅ FETCH
  const fetchTransactions = async () => {
    try {
      const res = await fetch(`${BASE_URL}/transactions`);
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error("Fetch error:", err.message);
    }
  };

  // ✅ ADD
  const addTransaction = async (tx) => {
    try {
      const res = await fetch(`${BASE_URL}/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tx),
      });

      const data = await res.json();
      setTransactions((prev) => [...prev, data]);
    } catch (err) {
      console.error("Add error:", err.message);
    }
  };

  // ✅ UPDATE (🔥 FIX)
  const updateTransaction = async (id, updatedTx) => {
    try {
      const res = await fetch(`${BASE_URL}/transactions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTx),
      });

      const data = await res.json();

      setTransactions((prev) => prev.map((t) => (t.id === id ? data : t)));
    } catch (err) {
      console.error("Update error:", err.message);
    }
  };

  // ✅ DELETE (🔥 FIX)
  const deleteTransaction = async (id) => {
    try {
      await fetch(`${BASE_URL}/transactions/${id}`, {
        method: "DELETE",
      });

      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  return (
    <AppContext.Provider
      value={{
        transactions,
        role,
        setRole,
        search,
        setSearch,
        addTransaction,
        updateTransaction, // ✅ ADDED
        deleteTransaction, // ✅ ADDED
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
