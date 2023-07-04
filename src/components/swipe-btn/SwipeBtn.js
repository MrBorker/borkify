import styles from "./SwipeBtn.module.css";
import React from "react";

function SwipeBtn({ type, onClick }) {
  return (
    <button
      className={`${styles[type]} ${styles["btn"]}`}
      onClick={onClick}
    ></button>
  );
}

export { SwipeBtn };
