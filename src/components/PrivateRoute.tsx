import { Navigate, Outlet } from "react-router";
import { isAuthenticated } from "./Authenticate";

const ProtectedRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
