export default function StatusBadge({
  status,
}) {
  const styles = {
    Submitted:
      "bg-gray-100 text-gray-700",

    "Response Initiated":
      "bg-blue-100 text-blue-700",

    "Under Work":
      "bg-orange-100 text-orange-700",

    Resolved:
      "bg-green-100 text-green-700",

    Rejected:
      "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm ${styles[status]}`}
    >
      {status}
    </span>
  );
}