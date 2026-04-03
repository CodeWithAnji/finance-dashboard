import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { getSummary } from "../utils/calculations";

import LineChartComponent from "../components/charts/LineChart";
import BarChartComponent from "../components/charts/BarChart";
import PieChartComponent from "../components/charts/PieChart";

export default function Dashboard() {
  const { transactions } = useContext(AppContext);
  const { income, expense, balance } = getSummary(transactions);

  // ==============================
  // 📊 TIME-BASED 1: Balance Trend
  // ==============================
  const lineData = [...transactions]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((t) => ({
      date: t.date,
      amount: t.type === "income" ? t.amount : -t.amount,
    }));

  // ==============================
  // 📊 TIME-BASED 2: Monthly Comparison
  // ==============================
  const monthlyMap = {};

  transactions.forEach((t) => {
    const month = new Date(t.date).toLocaleString("default", {
      month: "short",
    });

    if (!monthlyMap[month]) {
      monthlyMap[month] = { month, income: 0, expense: 0 };
    }

    if (t.type === "income") {
      monthlyMap[month].income += t.amount;
    } else {
      monthlyMap[month].expense += t.amount;
    }
  });

  const monthlyData = Object.values(monthlyMap);

  // ==============================
  // 🥧 CATEGORICAL 1: Expense Breakdown
  // ==============================
  const categoryMap = {};

  transactions.forEach((t) => {
    const type = t.type?.toString().trim().toLowerCase();

    if (type === "expense") {
      const category = t.category?.toString().trim() || "Other";

      categoryMap[category] =
        (categoryMap[category] || 0) + Number(t.amount || 0);
    }
  });

  let pieData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  if (pieData.length === 0) {
    pieData = [{ name: "No Data", value: 1 }];
  }

  // ==============================
  // 🥧 CATEGORICAL 2: Income vs Expense
  // ==============================
  const ratioData = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];

  return (
    <div className="min-h-screen p-4 bg-[#0f172a] text-white flex flex-col gap-4 overflow-y-auto mt-[-20px] ">
      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-3 rounded-xl bg-[#1e293b]  border border-gray-700 shadow-md">
          <p className="text-xs text-white font-semibold">Income</p>
          <h2 className="text-lg font-bold text-green-400">₹{income}</h2>
        </div>

        <div className="p-3 rounded-xl  bg-[#1e293b] border border-gray-700 shadow-sm">
          <p className="text-xs text-white font-semibold">Expense</p>
          <h2 className="text-lg font-bold text-red-400">₹{expense}</h2>
        </div>

        <div className="p-3 rounded-xl   bg-[#1e293b] shadow-sm border border-gray-700">
          <p className="text-xs text-white font-semibold">Balance</p>
          <h2 className="text-lg font-bold text-blue-400">₹{balance}</h2>
        </div>
      </div>

      {/* CHART GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* LINE */}
        <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-3 shadow-sm flex flex-col">
          <h3 className="text-sm font-semibold text-gray-300 mb-1">
            Balance Trend
          </h3>
          <div className="flex-1">
            <LineChartComponent data={lineData} />
          </div>
        </div>

        {/* BAR */}
        <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-3 shadow-sm flex flex-col">
          <h3 className="text-sm font-semibold text-gray-300 mb-1">
            Monthly Comparison
          </h3>
          <div className="flex-1">
            <BarChartComponent data={monthlyData} />
          </div>
        </div>

        {/* PIE 1 */}
        <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-3 shadow-sm flex flex-col">
          <h3 className="text-sm font-semibold text-gray-300 mb-1">
            Expense Breakdown
          </h3>
          <div className="flex-1">
            <PieChartComponent data={pieData} />
          </div>
        </div>

        {/* PIE 2 */}
        <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-3 shadow-sm flex flex-col">
          <h3 className="text-sm font-semibold text-gray-300 mb-1">
            Income vs Expense
          </h3>
          <div className="flex-1">
            <PieChartComponent data={ratioData} />
          </div>
        </div>
      </div>
    </div>
  );
}
