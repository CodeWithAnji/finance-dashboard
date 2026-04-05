import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function TransactionForm({ categories, onSubmit, editData }) {
  const [form, setForm] = useState({
    amount: "",
    type: "income",
    category: "",
    date: "",
  });

  useEffect(() => {
    if (editData) setForm(editData);
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amount || !form.category || !form.date) {
      toast.error("All fields are required!");
      return;
    }
    onSubmit({ ...form, amount: Number(form.amount) });
    setForm({ amount: "", type: "income", category: "", date: "" });
  };

  return (
    <form
      className="bg-[#1e293b] border border-gray-700 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2"
      onSubmit={handleSubmit}
    >
      <input
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
        className="p-2 rounded-lg bg-[#0f172a] border border-gray-700 text-xs sm:text-sm"
      />
      <select
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        className="p-2 rounded-lg bg-[#0f172a] border border-gray-700 text-xs sm:text-sm"
      >
        <option value="">Category</option>
        {categories.map((c, i) => (
          <option key={i} value={c}>
            {c}
          </option>
        ))}
      </select>
      <select
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
        className="p-2 rounded-lg bg-[#0f172a] border border-gray-700 text-xs sm:text-sm"
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        className="p-2 rounded-lg bg-[#0f172a] border border-gray-700 text-xs sm:text-sm"
      />
      <button
        type="submit"
        className="bg-purple-500 hover:bg-purple-600 rounded-lg text-xs sm:text-sm px-3 py-2"
      >
        {editData ? "Update" : "Add"}
      </button>
    </form>
  );
}
