import useAuth from "../../hooks/useAuth";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b h-16 flex items-center justify-between px-6">

      <h2 className="font-semibold">
        Workplace Issue Tracking System
      </h2>

      <div>
        {user?.name}
      </div>

    </header>
  );
}