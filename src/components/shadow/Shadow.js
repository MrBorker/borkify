import styles from "./Shadow.module.css";

function Shadow({ setIsModalOn }) {
  const handleClick = () => {
    setIsModalOn(0);
  };

  return <div className={styles["root"]} onClick={handleClick}></div>;
}

export { Shadow };
