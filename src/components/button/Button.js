import styles from "./Button.module.css";

function Button({ color, text, onClick }) {
  return (
    <button className={`${styles["btn"]} ${styles[color]}`} onClick={onClick}>
      {text}
    </button>
  );
}

export { Button };
