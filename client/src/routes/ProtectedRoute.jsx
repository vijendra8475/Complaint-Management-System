import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import {
  Skeleton,
} from "@/components/ui/skeleton";

export default function ProtectedRoute({
  children,
  allowedRoles,
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div><div className="space-y-4">

  <Skeleton className="h-12 w-full" />

  <Skeleton className="h-12 w-full" />

  <Skeleton className="h-12 w-full" />

</div></div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
}