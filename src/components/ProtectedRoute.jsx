import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles, allowedPermissions }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role.toLowerCase())) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (
    allowedPermissions &&
    (!user.permissions ||
      !allowedPermissions.every((perm) =>
        user.permissions.map((p) => p.toLowerCase()).includes(perm.toLowerCase())
      ))
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
