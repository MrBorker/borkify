import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { serverTimestamp } from "firebase/firestore";

import { useAuth } from "src/contexts/AuthContext";
import { Admin } from "src/pages";
import { fetchUserInfoFromFirestore } from "src/redux/profileSlice";
import { addUserInfoToFirestore } from "src/redux/profileSlice";

function PrivateRoute() {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  // const handleConnection = () => {
  //   dispatch(
  //     addUserInfoToFirestore({
  //       userId: currentUser.uid || "",
  //       wasOnline: serverTimestamp() || "",
  //     })
  //   );
  // };

  useEffect(() => {
    if (!currentUser.uid) return;
    dispatch(fetchUserInfoFromFirestore(currentUser.uid));
  }, [dispatch, currentUser.uid]);

  return currentUser ? <Admin /> : <Navigate to="/home" replace />;
}

export { PrivateRoute };
