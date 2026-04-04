import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";

const COLORS = [
  "#6366f1",
  "#ec4899",
  "#06b6d4",
  "#f59e0b",
  "#8b5cf6",
  "#10b981",
  "#f43f5e",
];

export default function PieChartComponent({ data }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <div className="w-full h-[200px] md:h-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={isMobile ? "55%" : "60%"}
            innerRadius="0%"
            paddingAngle={0}
            cx="50%"
            cy={isMobile ? "30%" : "40%"}
            stroke="none"
            label={({ percent, cx, cy, midAngle, outerRadius }) => {
              const RADIAN = Math.PI / 180;
              const radius = outerRadius * 1.3; // 👈 near circumference (slightly inside)
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return (
                <text
                  x={x}
                  y={y}
                  fill="gray"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="13px"
                >
                  {(percent * 100).toFixed(0)}%
                </text>
              );
            }}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
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
              fontSize: "11px",
              lineHeight: "16px",
              paddingLeft: "8px",
              paddingBottom: "50px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
