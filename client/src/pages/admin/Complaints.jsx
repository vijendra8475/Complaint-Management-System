import { useEffect, useState } from "react";

import AdminLayout from "@/layouts/AdminLayout";

import {
  getAllComplaints,
  updateComplaintStatus,
  updateComplaintRemarks,
} from "@/services/adminService";

import StatusBadge from "@/components/complaints/StatusBadge";

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);

  const [remarks, setRemarks] = useState({});

  const loadComplaints = async () => {
    const data = await getAllComplaints();

    setComplaints(data.complaints);
  };
  useEffect(() => {
    loadComplaints();
  }, []);

  const handleStatus = async (complaintId, status) => {
    await updateComplaintStatus(complaintId, status);

    loadComplaints();
  };

  const handleRemarks = async (complaintId) => {
    await updateComplaintRemarks(complaintId, remarks[complaintId]);

    loadComplaints();
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">All Complaints</h1>

      <div className="space-y-6">
        {complaints.length === 0 && (
          <div className="text-center py-10 text-slate-500">
            No complaints found
          </div>
        )}

        {complaints.map((complaint) => (
          <div key={complaint._id} className="bg-white border rounded-xl p-6">
            <h2 className="font-bold text-xl">{complaint.title}</h2>

            <p className="text-slate-500 mt-2">{complaint.description}</p>

            <div className="mt-4 flex gap-4">
              <StatusBadge status={complaint.status} />

              <span>{complaint.category}</span>

              <span>{complaint.priority}</span>
            </div>

            <div className="mt-4">
              <select
                onChange={(e) => handleStatus(complaint._id, e.target.value)}
                value={complaint.status}
                className="border p-2 rounded"
              >
                <option>Submitted</option>

                <option>Response Initiated</option>

                <option>Under Work</option>

                <option>Resolved</option>

                <option>Rejected</option>
              </select>
            </div>

            <div className="mt-4">
              <textarea
                placeholder="Remarks"
                className="w-full border p-3 rounded"
                defaultValue={complaint.remarks}
                onChange={(e) =>
                  setRemarks({
                    ...remarks,
                    [complaint._id]: e.target.value,
                  })
                }
              />

              <button
                onClick={() => handleRemarks(complaint._id)}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save Remarks
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
