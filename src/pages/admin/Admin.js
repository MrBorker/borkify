import { useEffect } from "react";

import { Outlet, Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { fetchUserInfoFromFirestore } from "src/redux/profileSlice";
import { useAuth } from "src/contexts/AuthContext";

import { sidebar } from "./constants";

import styles from "./Admin.module.css";

function Admin() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser.uid) return;
    dispatch(fetchUserInfoFromFirestore(currentUser.uid));
  }, [location, dispatch, currentUser]);

  return (
    <div className={styles["root"]}>
      <nav className={styles["sidebar"]}>
        <ul className={styles["list"]}>
          {sidebar.map(({ link, icon, text }) => {
            return (
              <li className={`${styles["item"]}`} key={link}>
                <Link to={link} className={styles["link"]}>
                  <div className={styles["icon"]}>{icon}</div>
                  <div className={styles["text"]}>{text}</div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className={styles["content"]}>
        <Outlet />
      </div>
    </div>
  );
}

export { Admin };
