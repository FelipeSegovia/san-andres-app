import { Navigate } from "react-router-dom";
import { PATHS } from "@/shared/types";

interface PrivateRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const PrivateRoute = ({ isAuthenticated, children }: PrivateRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to={PATHS.AUTH} replace />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
