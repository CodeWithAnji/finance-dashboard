import { createContext } from "react";
export const AppContext = createContext();
const API = "https://69cd4dacddc3cabb7bd27ae9.mockapi.io/api/fin";

const addTransaction = async (data) => {
  const res = await fetch(API, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  const newData = await res.json();
  setTransactions((prev) => [...prev, newData]);
};

const updateTransaction = async (id, data) => {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  const updated = await res.json();

  setTransactions((prev) => prev.map((t) => (t.id === id ? updated : t)));
};

const deleteTransaction = async (id) => {
  await fetch(`${API}/${id}`, { method: "DELETE" });

  setTransactions((prev) => prev.filter((t) => t.id !== id));
};
