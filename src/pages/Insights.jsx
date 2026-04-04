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

      if (t.type === "income") totalIncome += amount;

      if (t.type === "expense" || t.type === "expenditure") {
        categoryMap[t.category] = (categoryMap[t.category] || 0) + amount;

        if (
          date.getMonth() === currentMonth &&
          date.getFullYear() === currentYear
        ) {
          currentMonthExpense += amount;
        }

        if (date.getMonth() === prevMonth && date.getFullYear() === prevYear) {
          prevMonthExpense += amount;
        }

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
    if (change > 20) observation = "Spending increased significantly ";
    else if (change < -20) observation = "Great control over expenses";
    else observation = "Spending is stable ";

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
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black p-3 md:p-4 flex flex-col">
      {/* Header */}
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3">
        Insights
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 flex-1">
        {/* Card */}
        {[
          {
            label: "Top Spending Category",
            value: insights.topCategory,
            color: "text-red-400",
          },
          {
            label: "Current Month Expense",
            value: `₹${insights.currentMonthExpense}`,
            extra: (
              <div className="flex items-center gap-1 text-xs mt-1">
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
            ),
          },
          {
            label: "Previous Month Expense",
            value: `₹${insights.prevMonthExpense}`,
            color: "text-gray-300",
          },
          {
            label: "Avg Daily Expense",
            value: `₹${insights.avgExpense}`,
            color: "text-yellow-400",
          },
          {
            label: "Highest Spending Day",
            value: insights.maxDay,
            small: true,
          },
          {
            label: "Savings Rate",
            value: `${insights.savings}%`,
            color:
              insights.savings > 40
                ? "text-green-400"
                : insights.savings > 20
                  ? "text-yellow-400"
                  : "text-red-400",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-3 flex flex-col justify-center"
          >
            <p className="text-[10px] sm:text-xs text-gray-400">{item.label}</p>

            <h3
              className={`${
                item.small ? "text-xs sm:text-sm" : "text-base sm:text-lg"
              } font-semibold ${item.color || "text-white"}`}
            >
              {item.value}
            </h3>

            {item.extra}
          </div>
        ))}

        {/* Observation */}
        <div className="col-span-2 md:col-span-3 xl:col-span-4 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-white/10 rounded-xl p-3 text-xs sm:text-sm text-white flex items-center max-h-[80px]">
          {insights.observation}
        </div>
      </div>
    </div>
  );
}
