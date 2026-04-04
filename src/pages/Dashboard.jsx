import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { getSummary } from "../utils/calculations";

import LineChartComponent from "../components/charts/LineChart";
import DailyExpenseChart from "../components/charts/DailyExpenseChart";
import PieChartComponent from "../components/charts/PieChart";

export default function Dashboard() {
  const { transactions } = useContext(AppContext);
  const { income, expense, balance } = getSummary(transactions);

  // Balance Trend Data
  const lineData = [...transactions]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((t) => ({
      date: t.date,
      amount: t.type === "income" ? t.amount : -t.amount,
    }));

  // Monthly Comparison Data
  const monthlyMap = {};
  transactions.forEach((t) => {
    const month = new Date(t.date).toLocaleString("default", {
      month: "short",
    });
    if (!monthlyMap[month])
      monthlyMap[month] = { month, income: 0, expense: 0 };
    t.type === "income"
      ? (monthlyMap[month].income += t.amount)
      : (monthlyMap[month].expense += t.amount);
  });
  const monthlyData = Object.values(monthlyMap);

  // Expense Breakdown Data
  const categoryMap = {};
  transactions.forEach((t) => {
    if (t.type?.toLowerCase() === "expense") {
      const category = t.category?.trim() || "Other";
      categoryMap[category] =
        (categoryMap[category] || 0) + Number(t.amount || 0);
    }
  });
  const pieData = Object.keys(categoryMap).length
    ? Object.keys(categoryMap).map((k) => ({ name: k, value: categoryMap[k] }))
    : [{ name: "No Data", value: 1 }];

  // Income vs Expense Data
  const ratioData = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 mt-[-15px]">
      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#1e293b] border border-gray-700 shadow-md">
          <p className="text-xs text-gray-300 font-semibold">Income</p>
          <h2 className="text-lg font-bold text-green-400">₹{income}</h2>
        </div>
        <div className="p-4 rounded-xl bg-[#1e293b] border border-gray-700 shadow-md">
          <p className="text-xs text-gray-300 font-semibold">Expense</p>
          <h2 className="text-lg font-bold text-red-400">₹{expense}</h2>
        </div>
        <div className="p-4 rounded-xl bg-[#1e293b] border border-gray-700 shadow-md">
          <p className="text-xs text-gray-300 font-semibold">Balance</p>
          <h2 className="text-lg font-bold text-blue-400">₹{balance}</h2>
        </div>
      </div>

      {/* DASHBOARD SPLIT */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* LEFT: Balance Trend */}
        <div className="flex-1 p-4 rounded-xl bg-[#1e293b] border border-gray-700 shadow-md flex flex-col max-h-[400px] md:h-auto">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">
            Balance Trend
          </h3>
          <div className="flex-1 min-h-[180px]">
            <LineChartComponent data={lineData} />
          </div>
        </div>

        {/* RIGHT: Monthly + Pie Charts */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Monthly Comparison */}
          <div className="flex-1 p-4 rounded-xl bg-[#1e293b] border border-gray-700 shadow-md flex flex-col max-h-[200px]">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">
              Monthly Comparison
            </h3>
            <div className="flex-1 min-h-[150px]">
              <DailyExpenseChart transactions={transactions} />
            </div>
          </div>

          {/* Two Pie Charts */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 p-4 rounded-xl bg-[#1e293b] border border-gray-700 shadow-md flex flex-col max-h-[180px]">
              <h3 className="text-sm font-semibold text-gray-300 mb-2">
                Expense Breakdown
              </h3>
              <div className="flex-1 min-h-[150px]">
                <PieChartComponent data={pieData} />
              </div>
            </div>
            <div className="flex-1 p-4 rounded-xl bg-[#1e293b] border border-gray-700 shadow-md flex flex-col max-h-[180px]">
              <h3 className="text-sm font-semibold text-gray-300 mb-2">
                Income vs Expense
              </h3>
              <div className="flex-1 min-h-[150px]">
                <PieChartComponent data={ratioData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
