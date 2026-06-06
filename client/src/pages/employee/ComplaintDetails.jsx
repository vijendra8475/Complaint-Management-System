import {
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import EmployeeLayout from "../../layouts/EmployeeLayout";

import {
  getComplaintById,
} from "../../services/complaintService";

export default function ComplaintDetails() {

  const { id } = useParams();

  const [complaint,
    setComplaint] =
    useState(null);

  useEffect(() => {
    loadComplaint();
  }, []);

  const loadComplaint =
    async () => {
      try {

        const data =
          await getComplaintById(
            id
          );

        setComplaint(
          data.complaint
        );

      } catch (error) {
        console.error(error);
      }
    };

  if (!complaint) {
    return (
      <EmployeeLayout>
        Loading...
      </EmployeeLayout>
    );
  }

  return (
    <EmployeeLayout>

      <h1 className="text-3xl font-bold mb-6">
        Complaint Details
      </h1>

      <div className="bg-white border rounded-xl p-6">

        <h2 className="text-2xl font-semibold mb-4">
          {complaint.title}
        </h2>

        <p className="mb-6">
          {complaint.description}
        </p>

        <div className="space-y-2">

          <p>
            <strong>Category:</strong>
            {" "}
            {complaint.category}
          </p>

          <p>
            <strong>Priority:</strong>
            {" "}
            {complaint.priority}
          </p>

          <p>
            <strong>Status:</strong>
            {" "}
            {complaint.status}
          </p>

          <p>
            <strong>Remarks:</strong>
            {" "}
            {complaint.remarks || "No remarks"}
          </p>

        </div>

      </div>

    </EmployeeLayout>
  );
}