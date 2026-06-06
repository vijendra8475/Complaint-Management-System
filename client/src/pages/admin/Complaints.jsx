import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import { getAllComplaints } from "../../services/adminService";

export default function Complaints() {
  const loadComplaints = async () => {
    try {
      const data = await getAllComplaints();

      setComplaints(data.complaints || []);
    } catch (error) {
      console.error(error);
    }
  };

  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    loadComplaints();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">All Complaints</h1>

      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-4 text-left">Employee</th>

              <th className="p-4 text-left">Title</th>

              <th className="p-4 text-left">Category</th>

              <th className="p-4 text-left">Priority</th>

              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint._id} className="border-t">
                <td className="p-4">{complaint.createdBy?.name}</td>

                <td className="p-4">{complaint.title}</td>

                <td className="p-4">{complaint.category}</td>

                <td className="p-4">{complaint.priority}</td>

                <td className="p-4">{complaint.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
