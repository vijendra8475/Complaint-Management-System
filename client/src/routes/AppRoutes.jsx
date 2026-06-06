import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import CreateComplaint from "../pages/employee/CreateComplaint";

import Login from "../pages/auth/Login";

import EmployeeDashboard from "../pages/employee/Dashboard";

import AdminDashboard from "../pages/admin/Dashboard";

import ProtectedRoute from "./ProtectedRoute";

import MyComplaints from "../pages/employee/MyComplaints";

import ComplaintDetails from "../pages/employee/ComplaintDetails";

import Complaints from "../pages/admin/Complaints";

import Analytics from "../pages/admin/Analytics";

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
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />

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
