import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StatusBadge from "../../components/StatusBadge";

import { Skeleton } from "@/components/ui/skeleton";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import EmployeeLayout from "../../layouts/EmployeeLayout";
import { getMyComplaints } from "../../services/complaintService";

export default function MyComplaints() {
  const [complaints, setComplaints] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    try {
      const data = await getMyComplaints();

      setComplaints(data.complaints || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  if (loading) {
    return (
      <EmployeeLayout>
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />

          <Skeleton className="h-12 w-full" />

          <Skeleton className="h-12 w-full" />
        </div>
      </EmployeeLayout>
    );
  }

  return (
    <EmployeeLayout>
      <h1 className="text-3xl font-bold mb-6">My Complaints</h1>

      <div className="bg-white rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {complaints.map((complaint) => (
              <TableRow key={complaint._id}>
                <TableCell>{complaint.title}</TableCell>

                <TableCell>
                  <StatusBadge status={complaint.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </EmployeeLayout>
  );
}
