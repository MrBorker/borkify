import { useEffect, useRef } from "react";
import styles from "./ChatMessage.module.css";
import { updateDoc, doc, Timestamp } from "firebase/firestore";
import { firestore } from "../../firebase";

function ChatMessage({ type, text, time }) {
  const ref = useRef();

  // const handleClick = async (id, updatedMessage, chatId) => {
  //   await updateDoc(doc(firestore, "chats", chatId), {
  //     messages: {
  //       text: updatedMessage,
  //       date: Timestamp.now(),
  //     },
  //   });
  // };

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [text]);

  return (
    <div className={`${styles["message"]} ${styles[type]}`} ref={ref}>
      <div className={styles["wrapper"]}>
        <p className={styles["text"]}>{text}</p>
        {type === "out" && (
          <button className={styles["edit-btn"]}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={21}
              height={21}
              fill="none"
            >
              <path
                stroke="#848484"
                strokeWidth={2}
                d="M12.726 4.4 16.364 8M1.813 18.8 3.025 14 15.152 2l3.638 3.6-12.127 12-4.85 1.2Z"
              />
            </svg>
          </button>
        )}
      </div>
      <span className={styles["time"]}>{time}</span>
    </div>
  );
}

export { ChatMessage };
