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

  const fetchTransactions = async () => {
    const res = await fetch(`${BASE_URL}/transactions`);
    const data = await res.json();
    setTransactions(data);
  };

  const addTransaction = async (tx) => {
    const res = await fetch(`${BASE_URL}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tx),
    });
    const data = await res.json();
    setTransactions((prev) => [...prev, data]);
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
