import { Button } from "src/components";

import styles from "./Notification.module.css";

function Notification({ text, onClick, withBtn, src }) {
  return (
    <div className={styles["root"]}>
      <p className={styles["info"]}>{text}</p>
      {withBtn && (
        <Button text="filter" color="rose" onClick={onClick}></Button>
      )}
      <img
        className={styles["image"]}
        src="/assets/admin/notification.png"
        alt=""
      />
    </div>
  );
}

export { Notification };
