import styles from "./Message.module.css";

function Message({ text, type }) {
  return <div className={`${styles[`${type}`]} ${styles["root"]}`}>{text}</div>;
}

export { Message };
