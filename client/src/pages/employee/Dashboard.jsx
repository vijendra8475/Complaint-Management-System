import EmployeeLayout from "../../layouts/EmployeeLayout";

import StatCard from "../../components/dashboard/StatCard";

export default function Dashboard() {
  return (
    <EmployeeLayout>

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-4">

        <StatCard
          title="Total Complaints"
          value="12"
        />

        <StatCard
          title="Open"
          value="4"
        />

        <StatCard
          title="Resolved"
          value="6"
        />

        <StatCard
          title="Rejected"
          value="2"
        />

      </div>

    </EmployeeLayout>
  );
}