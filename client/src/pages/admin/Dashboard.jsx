import AdminLayout from "../../layouts/AdminLayout";

export default function Dashboard() {
  return (
    <AdminLayout>

      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-4">

        <div className="bg-white p-6 rounded-xl border">
          Total Complaints
        </div>

        <div className="bg-white p-6 rounded-xl border">
          Open
        </div>

        <div className="bg-white p-6 rounded-xl border">
          Resolved
        </div>

        <div className="bg-white p-6 rounded-xl border">
          Rejected
        </div>

      </div>

    </AdminLayout>
  );
}