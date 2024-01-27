import styles from "./ChatPreview.module.css";

function ChatPreview({ onClick, title, message, avatar, unread }) {
  return (
    <button className={styles["select-btn"]} onClick={onClick}>
      <div className={styles["avatar"]}>
        <img src={avatar} alt="" className={styles["avatar-img"]} />
      </div>
      <div className={styles["info"]}>
        <div className={styles["wrapper"]}>
          <h5 className={styles["title"]}>{title}</h5>
        </div>
        <p className={styles["message"]}>{message}</p>
      </div>
    </button>
  );
}

export { ChatPreview };
