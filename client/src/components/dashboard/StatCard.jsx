import { Card } from "@/components/ui/card";

export default function StatCard({
  title,
  value,
  subtitle,
}) {
  return (
    <Card className="p-6">

      <p className="text-sm text-muted-foreground">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>

      <p className="text-xs text-muted-foreground mt-2">
        {subtitle}
      </p>

    </Card>
  );
}