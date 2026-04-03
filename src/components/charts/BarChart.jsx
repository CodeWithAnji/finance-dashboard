import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function BarChartComponent({ data }) {
  return (
    <div className="relative w-full h-[180px] cursor-pointer">
      {/* ✅ CUSTOM LEGEND (TOP RIGHT - ROW) */}
      <div className="absolute top-0 right-0 flex flex-col items-start gap-1 text-xs text-gray-400 z-10">
        {/* Income */}
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-green-500 "></span>
          <span>Income</span>
        </div>

        {/* Expense */}
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-red-500 "></span>
          <span>Expense</span>
        </div>
      </div>

      {/* CHART */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barCategoryGap="30%">
          <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 10 }} />
          <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} />

          <Tooltip />

          {/* 💰 Income */}
          <Bar
            dataKey="income"
            fill="#22c55e"
            barSize={20}
            isAnimationActive={true}
            animationDuration={1000}
            animationEasing="ease-out"
          />

          {/* 💸 Expense */}
          <Bar
            dataKey="expense"
            fill="#ef4444"
            barSize={20}
            isAnimationActive={true}
            animationDuration={1000}
            animationEasing="ease-out"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
