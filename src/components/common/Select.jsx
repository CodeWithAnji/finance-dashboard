export default function Select({ options, ...props }) {
  return (
    <select {...props} className="border p-2 rounded">
      {options.map((opt) => (
        <option key={opt}>{opt}</option>
      ))}
    </select>
  );
}
