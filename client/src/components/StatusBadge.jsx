import { Badge } from "@/components/ui/badge";

export default function StatusBadge({
  status,
}) {

  const variants = {
    Submitted:
      "bg-slate-200",

    "Response Initiated":
      "bg-blue-200",

    "Under Work":
      "bg-orange-200",

    Resolved:
      "bg-green-200",

    Rejected:
      "bg-red-200",
  };

  return (
    <Badge
      className={
        variants[status]
      }
    >
      {status}
    </Badge>
  );
}