import { useContext, useState, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function Transactions() {
  const {
    transactions,
    role,
    search,
    setSearch,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useContext(AppContext);

  const [form, setForm] = useState({
    amount: "",
    type: "income",
    category: "",
    date: "",
  });

  const [editId, setEditId] = useState(null);
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const categories = ["Food", "Travel", "Shopping", "Salary", "Bills", "Other"];

  // 🔥 FILTER + SEARCH + SORT
  const filtered = useMemo(() => {
    let data = [...transactions];

    if (search) {
      data = data.filter(
        (t) =>
          t.category.toLowerCase().includes(search.toLowerCase()) ||
          t.type.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (filterType !== "all") {
      data = data.filter((t) => t.type === filterType);
    }

    if (sortBy === "amount") {
      data.sort((a, b) => b.amount - a.amount);
    } else {
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return data;
  }, [transactions, search, filterType, sortBy]);

  const handleSubmit = async () => {
    if (!form.amount || !form.category || !form.date) return;

    if (editId) {
      await updateTransaction(editId, {
        ...form,
        amount: Number(form.amount),
      });
    } else {
      await addTransaction({
        ...form,
        amount: Number(form.amount),
      });
    }

    setForm({ amount: "", type: "income", category: "", date: "" });
    setEditId(null);
  };

  const handleDelete = async (id) => {
    await deleteTransaction(id);
  };

  const handleEdit = (t) => {
    setForm({
      amount: t.amount,
      type: t.type,
      category: t.category,
      date: t.date,
    });
    setEditId(t.id);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-3 sm:p-4 lg:p-6">
      {/* Header */}
      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-300 mb-4">
        Transactions
      </h2>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 mb-4">
        <input
          placeholder="Search category or type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[150px] p-2 rounded-lg bg-[#1e293b] border border-gray-700 text-xs sm:text-sm"
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="p-2 rounded-lg bg-[#1e293b] border border-gray-700 text-xs sm:text-sm"
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 rounded-lg bg-[#1e293b] border border-gray-700 text-xs sm:text-sm"
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
        </select>
      </div>

      {/* FORM */}
      {role === "admin" && (
        <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-3 sm:p-4 mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
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
            onClick={handleSubmit}
            className="bg-purple-500 hover:bg-purple-600 rounded-lg text-xs sm:text-sm px-3 py-2"
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>
      )}

      {/* TABLE (Tablet + Desktop) */}
      <div className="hidden md:block bg-[#1e293b] border border-gray-700 rounded-xl overflow-x-auto">
        <table className="w-full text-xs sm:text-sm min-w-[600px]">
          <thead className="bg-[#0f172a] text-gray-400">
            <tr>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="border-t border-gray-700">
                <td className="p-3">{t.date}</td>
                <td className="p-3">{t.category}</td>
                <td
                  className={`p-3 font-semibold ${
                    t.type === "income" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  ₹{t.amount}
                </td>
                <td className="p-3 capitalize">{t.type}</td>
                <td className="p-3 flex gap-3">
                  <FaEdit
                    onClick={() => handleEdit(t)}
                    className="text-blue-400 cursor-pointer"
                  />
                  <FaTrash
                    onClick={() => handleDelete(t.id)}
                    className="text-red-400 cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden flex flex-col gap-2">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="bg-[#1e293b] border border-gray-700 rounded-lg p-2"
          >
            <div className="flex justify-between items-center text-xs text-gray-400">
              <span>{t.date}</span>
              <span className="capitalize">{t.type}</span>
            </div>

            <h3 className="text-sm font-medium mt-1">{t.category}</h3>

            <p
              className={`font-bold ${
                t.type === "income" ? "text-green-400" : "text-red-400"
              }`}
            >
              ₹{t.amount}
            </p>

            <div className="flex gap-4 mt-1">
              <FaEdit onClick={() => handleEdit(t)} className="text-blue-400" />
              <FaTrash
                onClick={() => handleDelete(t.id)}
                className="text-red-400"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
