import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles["root"]}>
      <div className={styles["images"]}></div>
      <div className={styles["content"]}></div>
    </div>
  );
}

export { Home };
