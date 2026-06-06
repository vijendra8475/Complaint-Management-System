import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

export default function AdminLayout({
  children,
}) {
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <main className="p-6">
          {children}
        </main>

      </div>

    </div>
  );
}