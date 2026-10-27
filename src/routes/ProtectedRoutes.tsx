import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute() {
  const { isAuthenticated ,token} = useAuth();
// console.log("ProtectedRoute token:", token);
//   console.log("isAuthenticated:", isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}