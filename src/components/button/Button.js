import styles from "./Button.module.css";

function Button({ color, text, onClick, type }) {
  return (
    <button
      className={`${styles["btn"]} ${styles[color]}`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
}

export { Button };
