import styles from "./ChatPreview.module.css";

function ChatPreview({ title, message, avatar, unread }) {
  return (
    <button className={styles["select-btn"]}>
      <div className={styles["avatar"]}>
        <img src={avatar} alt="" className={styles["avatar-img"]} />
      </div>
      <div className={styles["info"]}>
        <div className={styles["wrapper"]}>
          <h5 className={styles["title"]}>{title}</h5>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={14}
            height={19}
            fill="none"
          >
            <path
              fill="#F85961"
              d="M13.788 15.144v1.141H.02v-1.14S-.273 14.513 1.324 13c1.597-1.512 1.387-5.42 1.387-8.067 0-2.647 3.717-2.703 3.717-2.703h.128v-.43c0-.264-.888-1.222-.888-1.222L5.655 0h2.506l-.017.601s-.961.957-.961 1.239v.39h.198s3.717.057 3.717 2.704c0 2.647-.21 6.555 1.387 8.068 1.597 1.512 1.303 2.142 1.303 2.142ZM8.474 16.89c0 .866-.7 1.802-1.566 1.802-.865 0-1.566-.936-1.566-1.802 0 .02 3.132-.02 3.132 0Z"
            />
          </svg>
        </div>
        <p className={styles["message"]}>{message}</p>
      </div>
    </button>
  );
}

export { ChatPreview };
