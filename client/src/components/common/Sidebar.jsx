import { LayoutDashboard, PlusCircle, FileText, LogOut } from "lucide-react";

import { Link } from "react-router-dom";

import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="w-64 bg-white border-r min-h-screen flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold">WITS</h1>
      </div>

      <nav className="p-4 space-y-2">
        {user?.role === "employee" && (
          <>
            <Link
              to="/employee"
              className="flex items-center gap-3 p-3 rounded hover:bg-slate-100"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            <Link
              to="/employee/create"
              className="flex items-center gap-3 p-3 rounded hover:bg-slate-100"
            >
              <PlusCircle size={18} />
              Create Complaint
            </Link>

            <Link
              to="/employee/complaints"
              className="flex items-center gap-3 p-3 rounded hover:bg-slate-100"
            >
              <FileText size={18} />
              My Complaints
            </Link>
          </>
        )}

        {user?.role === "admin" && (
          <>
            <Link
              to="/admin"
              className="flex items-center gap-3 p-3 rounded hover:bg-slate-100"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            <Link
              to="/admin/complaints"
              className="flex items-center gap-3 p-3 rounded hover:bg-slate-100"
            >
              <FileText size={18} />
              Complaints
            </Link>

            <Link
              to="/admin/analytics"
              className="flex items-center gap-3 p-3 rounded hover:bg-slate-100"
            >
              📊 Analytics
            </Link>
          </>
        )}

        <hr className="my-4" />

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 rounded hover:bg-red-50 text-red-600 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </nav>

      <div className="mt-auto p-4 border-t">
        <p className="text-sm">{user?.name}</p>
      </div>
    </aside>
  );
}
