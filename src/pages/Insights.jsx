import { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function Insights() {
  const { transactions } = useContext(AppContext);

  const insights = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return {
        topCategory: "None",
        currentMonthExpense: 0,
        prevMonthExpense: 0,
        change: 0,
        avgExpense: 0,
        maxDay: "N/A",
        observation: "No data available",
        savings: 0,
      };
    }

    const categoryMap = {};
    const dailyMap = {};

    let currentMonthExpense = 0;
    let prevMonthExpense = 0;
    let totalIncome = 0;

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const prevDate = new Date(currentYear, currentMonth - 1);
    const prevMonth = prevDate.getMonth();
    const prevYear = prevDate.getFullYear();

    transactions.forEach((t) => {
      const amount = Number(t.amount) || 0;
      const date = new Date(t.date);

      if (t.type === "income") {
        totalIncome += amount;
      }

      if (t.type === "expense" || t.type === "expenditure") {
        // Category
        categoryMap[t.category] = (categoryMap[t.category] || 0) + amount;

        // Monthly
        if (
          date.getMonth() === currentMonth &&
          date.getFullYear() === currentYear
        ) {
          currentMonthExpense += amount;
        }

        if (date.getMonth() === prevMonth && date.getFullYear() === prevYear) {
          prevMonthExpense += amount;
        }

        // Daily
        const key = date.toDateString();
        dailyMap[key] = (dailyMap[key] || 0) + amount;
      }
    });

    const topCategory =
      Object.keys(categoryMap).length > 0
        ? Object.keys(categoryMap).reduce((a, b) =>
            categoryMap[a] > categoryMap[b] ? a : b,
          )
        : "None";

    const change =
      prevMonthExpense === 0
        ? 100
        : ((currentMonthExpense - prevMonthExpense) / prevMonthExpense) * 100;

    const avgExpense = currentMonthExpense / (new Date().getDate() || 1);

    const maxDay =
      Object.keys(dailyMap).length > 0
        ? Object.keys(dailyMap).reduce((a, b) =>
            dailyMap[a] > dailyMap[b] ? a : b,
          )
        : "N/A";

    const savings =
      totalIncome > 0
        ? ((totalIncome - currentMonthExpense) / totalIncome) * 100
        : 0;

    let observation = "";
    if (change > 20) {
      observation = "Spending increased significantly 🚨";
    } else if (change < -20) {
      observation = "Great control over expenses 🎯";
    } else {
      observation = "Spending is stable 📊";
    }

    return {
      topCategory,
      currentMonthExpense,
      prevMonthExpense,
      change: change.toFixed(1),
      avgExpense: avgExpense.toFixed(0),
      maxDay,
      observation,
      savings: savings.toFixed(1),
    };
  }, [transactions]);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black p-4 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="mb-3">
        <h2 className="text-xl md:text-2xl font-bold text-white">
          Insights Dashboard
        </h2>
      </div>

      {/* Grid Layout */}
      <div className="flex-1 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 auto-rows-fr">
        {/* Top Category */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 flex flex-col justify-between">
          <p className="text-gray-400 text-xs">Top Category</p>
          <h3 className="text-lg text-red-400 font-semibold">
            {insights.topCategory}
          </h3>
        </div>

        {/* Monthly Expense */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 flex flex-col justify-between">
          <p className="text-gray-400 text-xs">This Month</p>
          <h3 className="text-lg text-white">
            ₹{insights.currentMonthExpense}
          </h3>
          <div className="flex items-center gap-1 text-xs">
            {insights.change > 0 ? (
              <FaArrowUp className="text-red-400" />
            ) : (
              <FaArrowDown className="text-green-400" />
            )}
            <span
              className={
                insights.change > 0 ? "text-red-400" : "text-green-400"
              }
            >
              {insights.change}%
            </span>
          </div>
        </div>

        {/* Last Month */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 flex flex-col justify-between">
          <p className="text-gray-400 text-xs">Last Month</p>
          <h3 className="text-lg text-gray-300">
            ₹{insights.prevMonthExpense}
          </h3>
        </div>

        {/* Avg Daily */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 flex flex-col justify-between">
          <p className="text-gray-400 text-xs">Avg Daily</p>
          <h3 className="text-lg text-yellow-400">₹{insights.avgExpense}</h3>
        </div>

        {/* Highest Spend Day */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 flex flex-col justify-between">
          <p className="text-gray-400 text-xs">Peak Spend Day</p>
          <h3 className="text-xs text-white">{insights.maxDay}</h3>
        </div>

        {/* Savings Rate */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 flex flex-col justify-between">
          <p className="text-gray-400 text-xs">Savings Rate</p>
          <h3
            className={`text-lg font-semibold ${
              insights.savings > 40
                ? "text-green-400"
                : insights.savings > 20
                  ? "text-yellow-400"
                  : "text-red-400"
            }`}
          >
            {insights.savings}%
          </h3>
        </div>

        {/* Observation - Wide */}
        <div className="col-span-2 md:col-span-3 xl:col-span-4 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-white/10 rounded-xl p-4 flex items-center">
          <p className="text-sm text-white">{insights.observation}</p>
        </div>
      </div>
    </div>
  );
}
