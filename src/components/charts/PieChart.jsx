import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// 🎯 Tailwind purple shades (500 → 100)
const COLORS = [
  "#a855f7", // purple-500
  "#c084fc", // purple-400
  "#d8b4fe", // purple-300
  "#e9d5ff", // purple-200
  "#f3e8ff", // purple-100
];

export default function PieChartComponent({ data }) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          outerRadius={85}
          innerRadius={55}
          stroke="none"
          paddingAngle={3}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              stroke="none"
            />
          ))}
        </Pie>

        <Tooltip />

        <Legend
          layout="vertical"
          verticalAlign="middle"
          align="right"
          iconType="circle"
          wrapperStyle={{
            paddingLeft: "20px",
            fontSize: "13px",
            lineHeight: "20px",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
