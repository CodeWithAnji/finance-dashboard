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
    <div className="relative w-full h-[150px] md:h-full">
      {/* LEGEND */}
      <div className="absolute top-0 right-0 flex flex-col gap-1 text-xs text-gray-400 z-10">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-green-500"></span>
          <span>Income</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-red-500"></span>
          <span>Expense</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barCategoryGap="30%">
          <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 10 }} />
          <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} />
          <Tooltip />
          <Bar dataKey="income" fill="#22c55e" barSize={16} />
          <Bar dataKey="expense" fill="#ef4444" barSize={16} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
