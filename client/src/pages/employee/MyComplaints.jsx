import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import EmployeeLayout from "../../layouts/EmployeeLayout";
import { getMyComplaints } from "../../services/complaintService";

export default function MyComplaints() {
  const [complaints, setComplaints] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const data =
        await getMyComplaints();

      setComplaints(
        data.complaints || []
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <EmployeeLayout>
        Loading...
      </EmployeeLayout>
    );
  }

  return (
    <EmployeeLayout>
      <h1 className="text-3xl font-bold mb-6">
        My Complaints
      </h1>

      <div className="bg-white rounded-xl border overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-50">
            <tr>
              <th className="p-4 text-left">
                Title
              </th>

              <th className="p-4 text-left">
                Category
              </th>

              <th className="p-4 text-left">
                Priority
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody>

            {complaints.map(
              (complaint) => (
                <tr
                  key={complaint._id}
                  className="border-t"
                >
                  <td className="p-4">
                    {complaint.title}
                  </td>

                  <td className="p-4">
                    {complaint.category}
                  </td>

                  <td className="p-4">
                    {complaint.priority}
                  </td>

                  <td className="p-4">
                    {complaint.status}
                  </td>

                  <td className="p-4">
                    <Link
                      to={`/employee/complaints/${complaint._id}`}
                      className="text-blue-600"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </EmployeeLayout>
  );
}