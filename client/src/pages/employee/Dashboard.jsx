import { useEffect, useState } from "react";
import EmployeeLayout from "@/layouts/EmployeeLayout";
import { getMyComplaints } from "@/services/complaintService";

export default function Dashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      const data = await getMyComplaints();

      setComplaints(data.complaints || []);
    } catch (error) {
      console.error(error);
    }
  };

  const stats = {
    total: complaints.length,

    open: complaints.filter(
      (c) =>
        c.status !== "Resolved" &&
        c.status !== "Rejected"
    ).length,

    resolved: complaints.filter(
      (c) => c.status === "Resolved"
    ).length,

    rejected: complaints.filter(
      (c) => c.status === "Rejected"
    ).length,
  };

  return (
    <EmployeeLayout>
      <h1 className="text-3xl font-bold mb-6">
        Employee Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border">
          <p>Total Complaints</p>
          <h2 className="text-3xl font-bold">
            {stats.total}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <p>Open</p>
          <h2 className="text-3xl font-bold">
            {stats.open}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <p>Resolved</p>
          <h2 className="text-3xl font-bold">
            {stats.resolved}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <p>Rejected</p>
          <h2 className="text-3xl font-bold">
            {stats.rejected}
          </h2>
        </div>
      </div>
    </EmployeeLayout>
  );
}