import { useContext, useMemo, useState } from "react";
import { AppContext } from "../context/AppContext";
import TransactionForm from "./TransactionForm";
import TransactionTable from "./TransactionTable";
import { FiDownload } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [editData, setEditData] = useState(null);
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const categories = ["Food", "Travel", "Shopping", "Salary", "Bills", "Other"];

  // 🔥 FILTER + SEARCH + SORT
  // 🔥 FILTER + SEARCH + SORT (Enhanced)
  const filtered = useMemo(() => {
    let data = [...transactions];

    if (search) {
      const lowerSearch = search.toLowerCase();
      data = data.filter((t) => {
        return (
          t.category.toLowerCase().includes(lowerSearch) || // category match
          t.type.toLowerCase().includes(lowerSearch) || // type match
          t.date.includes(search) || // date match (YYYY-MM-DD)
          t.amount.toString().includes(search) // amount match
        );
      });
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
  const handleAddUpdate = async (t) => {
    if (editData) {
      await updateTransaction(editData.id, t);
      toast.success("Transaction updated!");
      setEditData(null);
    } else {
      await addTransaction(t);
      toast.success("Transaction added!");
    }
  };

  const handleDelete = async (id) => {
    await deleteTransaction(id);
  };

  const handleEdit = (t) => setEditData(t);

  const handleExport = () => {
    if (!filtered.length) return toast.warn("No transactions to export!");
    const headers = ["Date", "Category", "Type", "Amount"];
    const csvRows = [
      headers.join(","),
      ...filtered.map((t) => [t.date, t.category, t.type, t.amount].join(",")),
    ];
    const csvData = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(csvData);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Transactions exported!");
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-4">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-300">
          Transactions
        </h2>
        <button
          onClick={handleExport}
          className="flex items-center gap-1 bg-green-500 hover:bg-green-600 rounded-lg text-xs sm:text-sm px-3 py-2"
        >
          <FiDownload className="text-white" />
          Export
        </button>
      </div>

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

      {role === "admin" && (
        <TransactionForm
          categories={categories}
          onSubmit={handleAddUpdate}
          editData={editData}
        />
      )}
      <TransactionTable
        data={filtered}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
