import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "@/pages/auth/Login";
import EmployeeDashboard from "@/pages/employee/Dashboard";
import CreateComplaint from "@/pages/employee/CreateComplaint";
import MyComplaints from "@/pages/employee/MyComplaints";
import ComplaintDetails from "@/pages/employee/ComplaintDetails";

import AdminDashboard from "@/pages/admin/Dashboard";
import Complaints from "@/pages/admin/Complaints";
import Analytics from "@/pages/admin/Analytics";

import ProtectedRoute from "@/routes/ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/employee"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/create"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <CreateComplaint />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/complaints"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <MyComplaints />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/complaints/:id"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <ComplaintDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/complaints"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Complaints />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Analytics />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
