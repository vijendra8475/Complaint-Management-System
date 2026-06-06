import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import { getAnalytics } from "../../services/analyticsService";

import { Skeleton } from "@/components/ui/skeleton";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

export default function Analytics() {
  const loadAnalytics = async () => {
    try {
      const data = await getAnalytics();

      setAnalytics(data);
    } catch (error) {
      console.error(error);
    }
  };
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  if (!analytics) {
    return (
      <AdminLayout>
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />

          <Skeleton className="h-12 w-full" />

          <Skeleton className="h-12 w-full" />
        </div>
      </AdminLayout>
    );
  }

  console.log(analytics);

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl border">
          <p>Total</p>
          <h2 className="text-3xl font-bold">{analytics.totalComplaints}</h2>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <p>Resolved</p>
          <h2 className="text-3xl font-bold">{analytics.resolvedComplaints}</h2>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <p>Pending</p>
          <h2 className="text-3xl font-bold">{analytics.pendingComplaints}</h2>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <p>Rejected</p>
          <h2 className="text-3xl font-bold">{analytics.rejectedComplaints}</h2>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-xl p-6 h-[400px]">
          <h2 className="font-semibold mb-4">Category Distribution</h2>

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={analytics.categoryStats}
                dataKey="count"
                nameKey="_id"
                outerRadius={120}
              >
                {analytics.categoryStats.map((_, index) => (
                  <Cell key={index} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border rounded-xl p-6 h-[400px]">
          <h2 className="font-semibold mb-4">Priority Distribution</h2>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics.priorityStats}>
              <XAxis dataKey="_id" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AdminLayout>
  );
}
