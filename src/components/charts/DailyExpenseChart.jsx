import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DailyExpenseChart({ transactions }) {
  const getLast7DaysExpense = () => {
    if (!transactions || transactions.length === 0) return [];

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // ✅ normalize date to YYYY-MM-DD
    const formatDate = (date) => {
      const d = new Date(date);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    };

    // ✅ get latest date safely
    const latestDate = new Date(
      Math.max(...transactions.map((t) => new Date(t.date).getTime())),
    );

    const result = [];

    // ✅ generate last 7 days
    for (let i = 6; i >= 0; i--) {
      const d = new Date(latestDate);
      d.setDate(latestDate.getDate() - i);

      result.push({
        date: formatDate(d),
        day: days[d.getDay()],
        expense: 0,
      });
    }

    // ✅ FIX: normalize transaction date before comparing
    transactions.forEach((t) => {
      const normalizedDate = formatDate(t.date);

      // ✅ FIX: handle both "expense" & "expenditure"
      if (t.type === "expense" || t.type === "expenditure") {
        const found = result.find((d) => d.date === normalizedDate);

        if (found) {
          found.expense += Number(t.amount) || 0;
        }
      }
    });

    console.log("FINAL CHART DATA:", result);
    return result;
  };

  const data = getLast7DaysExpense();

  return (
    <div className="relative w-full h-[180px] md:h-full">
      {/* LEGEND */}
      <div className="absolute top-0 right-0 flex flex-col gap-1 text-xs text-gray-400 z-10">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-red-500"></span>
          <span>Expense</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="day" tick={{ fill: "#9ca3af", fontSize: 10 }} />
          <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} />
          <Tooltip />
          <Bar dataKey="expense" fill="#ef4444" barSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
