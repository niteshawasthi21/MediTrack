import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AppLoader from "../components/ui/Loader";
import type { ReactElement } from "react";

type ProtectedRouteProps = {
  children: ReactElement;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <AppLoader open={true} message="Checking your session..." />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
