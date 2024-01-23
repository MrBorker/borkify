import styles from "./Shadow.module.css";

function Shadow({ setIsModalOn }) {
  const handleClick = () => {
    setIsModalOn(false);
  };

  return <div className={styles["root"]} onClick={handleClick}></div>;
}

export { Shadow };
