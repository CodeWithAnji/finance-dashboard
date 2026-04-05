import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

export default function TransactionTable({ data, onEdit, onDelete }) {
  const handleDelete = (id) => {
    onDelete(id);
    toast.success("Transaction deleted!");
  };

  return (
    <>
      {/* Desktop Table */}
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
            {data.map((t) => (
              <tr key={t.id} className="border-t border-gray-700">
                <td className="p-3">{t.date}</td>
                <td className="p-3">{t.category}</td>
                <td
                  className={`p-3 font-semibold ${t.type === "income" ? "text-green-400" : "text-red-400"}`}
                >
                  ₹{t.amount}
                </td>
                <td className="p-3 capitalize">{t.type}</td>
                <td className="p-3 flex gap-3">
                  <FaEdit
                    onClick={() => onEdit(t)}
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

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-2">
        {data.map((t) => (
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
              className={`font-bold ${t.type === "income" ? "text-green-400" : "text-red-400"}`}
            >
              ₹{t.amount}
            </p>
            <div className="flex gap-4 mt-1">
              <FaEdit onClick={() => onEdit(t)} className="text-blue-400" />
              <FaTrash
                onClick={() => handleDelete(t.id)}
                className="text-red-400"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
