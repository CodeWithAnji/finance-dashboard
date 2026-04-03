import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Insights() {
  const { transactions } = useContext(AppContext);

  const categoryMap = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const topCategory =
    Object.keys(categoryMap).length > 0
      ? Object.keys(categoryMap).reduce((a, b) =>
          categoryMap[a] > categoryMap[b] ? a : b,
        )
      : "None";

  return (
    <div>
      <h2 className="text-xl font-bold">Insights</h2>
      <p className="mt-2">
        Top Spending Category: <b>{topCategory}</b>
      </p>
    </div>
  );
}
