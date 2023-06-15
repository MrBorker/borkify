import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { Admin } from "./pages";

function PrivateRoute() {
  const { currentUser } = useAuth();

  return currentUser ? <Admin /> : <Navigate to="/home" replace />;
}

export { PrivateRoute };
