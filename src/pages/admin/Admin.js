import { Outlet, Link } from "react-router-dom";

import { sidebar } from "./constants";

import styles from "./Admin.module.css";

function Admin() {
  return (
    <div className={styles["root"]}>
      <nav className={styles["sidebar"]}>
        <ul className={styles["list"]}>
          {sidebar.map(({ link, icon, text }) => {
            return (
              <li className={`${styles["item"]}`}>
                <Link to={link} className={styles["link"]}>
                  <div className={styles["icon"]}>{icon}</div>
                  {text}
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
