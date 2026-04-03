export default function SummaryCard({ title, value, color }) {
  return (
    <div className={`p-4 rounded ${color}`}>
      <h4>{title}</h4>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}
