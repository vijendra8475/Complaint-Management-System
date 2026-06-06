import {
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import EmployeeLayout from "@/layouts/EmployeeLayout";

import {
  getComplaintById,
} from "@/services/complaintService";

import StatusBadge from "@/components/complaints/StatusBadge";

export default function ComplaintDetails() {
  const { id } =
    useParams();

  const [complaint,
    setComplaint] =
    useState(null);

  useEffect(() => {
    loadComplaint();
  }, []);

  const loadComplaint =
    async () => {
      const data =
        await getComplaintById(
          id
        );

      setComplaint(
        data.complaint
      );
    };

  if (!complaint)
    return (
      <EmployeeLayout>
        Loading...
      </EmployeeLayout>
    );

  return (
    <EmployeeLayout>

      <h1 className="text-3xl font-bold mb-6">
        Complaint Details
      </h1>

      <div className="bg-white border rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-4">
          {complaint.title}
        </h2>

        <p className="mb-6">
          {
            complaint.description
          }
        </p>

        <div className="space-y-3">

          <p>
            Category:
            {
              complaint.category
            }
          </p>

          <p>
            Priority:
            {
              complaint.priority
            }
          </p>

          <div>
            <StatusBadge
              status={
                complaint.status
              }
            />
          </div>

          <p>
            Remarks:
            {" "}
            {complaint.remarks ||
              "No remarks"}
          </p>

        </div>

      </div>

    </EmployeeLayout>
  );
}