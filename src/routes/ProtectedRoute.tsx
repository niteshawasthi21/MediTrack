import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AppLoader from "../components/ui/Loader";

export default function ProtectedRoute({ children }: any) {
  const { user, loading } = useAuth();

  if (loading) {
    return <AppLoader open={true} message="Checking your session..." />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
