import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/auth/Login";

import EmployeeDashboard from "../pages/employee/Dashboard";

import AdminDashboard from "../pages/admin/Dashboard";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/employee"
          element={
            <ProtectedRoute
              allowedRoles={[
                "employee",
              ]}
            >
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute
              allowedRoles={[
                "admin",
              ]}
            >
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <Navigate to="/" />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}