import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { serverTimestamp } from "firebase/firestore";

import { useAuth } from "src/contexts/AuthContext";
import { Admin } from "src/pages";

function PrivateRoute() {
  const { currentUser } = useAuth();

  return currentUser ? <Admin /> : <Navigate to="/home" replace />;
}

export { PrivateRoute };
