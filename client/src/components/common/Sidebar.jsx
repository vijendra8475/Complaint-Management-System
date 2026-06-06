import { LayoutDashboard, FileText, BarChart3, LogOut } from "lucide-react";

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r min-h-screen">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold">WITS</h1>
      </div>

      <nav className="p-4 space-y-2">
        <Link
          to="/employee/create"
          className="flex items-center gap-3 p-3 rounded hover:bg-slate-100"
        >
          Create Complaint
        </Link>

        <Link
          to="/employee"
          className="flex items-center gap-3 p-3 rounded hover:bg-slate-100"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link
          to="/employee/complaints"
          className="flex items-center gap-3 p-3 rounded hover:bg-slate-100"
        >
          <FileText size={18} />
          My Complaints
        </Link>

        <Link
          to="/admin/analytics"
          className="flex items-center gap-3 p-3 rounded hover:bg-slate-100"
        >
          <BarChart3 size={18} />
          Analytics
        </Link>

        <button className="w-full flex items-center gap-3 p-3 rounded hover:bg-slate-100">
          <LogOut size={18} />
          Logout
        </button>
      </nav>
    </aside>
  );
}
