import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import EmployeeLayout from "@/layouts/EmployeeLayout";

import {
  getMyComplaints,
} from "@/services/complaintService";

import StatusBadge from "@/components/complaints/StatusBadge";

export default function MyComplaints() {
  const [complaints,
    setComplaints] =
    useState([]);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints =
    async () => {
      const data =
        await getMyComplaints();

      setComplaints(
        data.complaints
      );
    };

  return (
    <EmployeeLayout>

      <h1 className="text-3xl font-bold mb-6">
        My Complaints
      </h1>

      <div className="bg-white border rounded-xl overflow-hidden">

        <table className="w-full">

          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>

            {complaints.map(
              (complaint) => (
                <tr
                  key={
                    complaint._id
                  }
                >
                  <td>
                    {
                      complaint.title
                    }
                  </td>

                  <td>
                    <StatusBadge
                      status={
                        complaint.status
                      }
                    />
                  </td>

                  <td>
                    <Link
                      to={`/employee/complaints/${complaint._id}`}
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