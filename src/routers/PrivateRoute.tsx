import { Navigate, Outlet, useLocation } from "react-router-dom";
import authStore from "../store/authStore";

export const PrivateRoute = () => {
  const location = useLocation();
  const { user } = authStore();
  if (!user)
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  return <Outlet />;
};
