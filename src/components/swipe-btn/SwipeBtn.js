import styles from "./SwipeBtn.module.css";

function SwipeBtn({ type, onClick }) {
  return (
    <button
      className={`${styles[type]} ${styles["btn"]}`}
      onClick={onClick}
    ></button>
  );
}

export { SwipeBtn };
