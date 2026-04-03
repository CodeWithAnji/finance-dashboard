import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function Transactions() {
  const { transactions, role, search, setSearch, addTransaction } =
    useContext(AppContext);

  const [form, setForm] = useState({
    amount: "",
    type: "income",
    category: "",
    date: "",
  });

  const [editId, setEditId] = useState(null);

  const categories = ["Food", "Travel", "Shopping", "Salary", "Bills", "Other"];

  const filtered = transactions.filter((t) =>
    t.category.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSubmit = () => {
    if (!form.amount || !form.category || !form.date) return;

    addTransaction({ ...form, amount: Number(form.amount) });

    setForm({ amount: "", type: "income", category: "", date: "" });
  };

  const handleDelete = (id) => {
    // implement delete in context
    console.log("delete", id);
  };

  const handleEdit = (t) => {
    setForm(t);
    setEditId(t.id);
  };

  return (
    <div className="min-h-screen p-4 bg-[#0f172a] text-white">
      {/* HEADER */}
      <h2 className="text-xl font-bold text-gray-300 mb-4">Transactions</h2>

      {/* SEARCH */}
      <input
        placeholder="Search category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/3 p-2 mb-4 rounded-lg bg-[#1e293b] border border-gray-700 text-sm outline-none"
      />

      {/* ADMIN FORM */}
      {role === "admin" && (
        <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-4 mb-4 grid grid-cols-1 md:grid-cols-5 gap-3">
          {/* Amount */}
          <input
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="p-2 rounded-lg bg-[#0f172a] border border-gray-700 text-sm"
          />

          {/* Category Dropdown */}
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="p-2 rounded-lg bg-[#0f172a] border border-gray-700 text-sm"
          >
            <option value="">Select Category</option>
            {categories.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Type */}
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="p-2 rounded-lg bg-[#0f172a] border border-gray-700 text-sm"
          >
            <option value="income">Income</option>
            <option value="expense">Expenditure</option>
          </select>

          {/* Date */}
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="p-2 rounded-lg bg-[#0f172a] border border-gray-700 text-sm"
          />

          {/* Button */}
          <button
            onClick={handleSubmit}
            className="bg-purple-500 hover:bg-purple-600 transition text-white rounded-lg text-sm px-3 py-2 cursor-pointer"
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>
      )}

      {/* TABLE (Desktop) */}
      <div className="hidden md:block bg-[#1e293b] border border-gray-700 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
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
              <tr
                key={t.id}
                className="border-t border-gray-700 hover:bg-[#0f172a]"
              >
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
                    className="cursor-pointer text-blue-400"
                    onClick={() => handleEdit(t)}
                  />
                  <FaTrash
                    className="cursor-pointer text-red-400"
                    onClick={() => handleDelete(t.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE VIEW */}
      <div className="md:hidden flex flex-col gap-3">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="bg-[#1e293b] border border-gray-700 rounded-xl p-3"
          >
            <p className="text-xs text-gray-400">{t.date}</p>
            <h3 className="font-semibold">{t.category}</h3>

            <p
              className={`font-bold ${
                t.type === "income" ? "text-green-400" : "text-red-400"
              }`}
            >
              ₹{t.amount}
            </p>

            <p className="text-xs capitalize text-gray-400">{t.type}</p>

            <div className="flex gap-4 mt-2">
              <FaEdit className="text-blue-400" onClick={() => handleEdit(t)} />
              <FaTrash
                className="text-red-400"
                onClick={() => handleDelete(t.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
