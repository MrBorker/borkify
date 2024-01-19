import { Button } from "src/components";

import styles from "./Notification.module.css";

function Notification({ text, onClick }) {
  return (
    <div className={styles["root"]}>
      <p className={styles["info"]}>{text}</p>
      <Button text="filter" color="rose" onClick={onClick}></Button>
      <img
        className={styles["image"]}
        src="/assets/admin/notification.png"
        alt=""
      />
    </div>
  );
}

export { Notification };
