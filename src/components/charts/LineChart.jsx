import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function LineChartComponent({ data }) {
  const maxValue = Math.max(...data.map((d) => d.amount));

  return (
    <div className="relative w-full h-[220px] md:h-full">
      {/* LEGEND */}
      <div className="absolute top-0 right-0 flex flex-col items-end gap-1 text-xs text-gray-400 z-10">
        <div className="flex items-center gap-1">
          <span className="w-4 h-[2px] bg-orange-300"></span>
          <span>Balance Trend</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-green-300 border border-green-500"></span>
          <span>Peak Balance</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" tick={{ fill: "#9ca3af", fontSize: 10 }} />
          <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="amount"
            stroke="orange"
            strokeWidth={3}
            isAnimationActive
            animationDuration={1200}
            dot={({ cx, cy, value }) =>
              value === maxValue ? (
                <circle
                  cx={cx}
                  cy={cy}
                  r={6}
                  fill="#86efac"
                  stroke="green"
                  strokeWidth={2}
                />
              ) : null
            }
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
