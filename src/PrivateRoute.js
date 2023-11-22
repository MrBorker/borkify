import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { Admin } from "./pages";
import { fetchUserInfoFromFirestore } from "./redux/profileSlice";

function PrivateRoute() {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser.uid) return;
    dispatch(fetchUserInfoFromFirestore(currentUser.uid));
  }, [dispatch, currentUser.uid]);

  return currentUser ? <Admin /> : <Navigate to="/home" replace />;
}

export { PrivateRoute };
