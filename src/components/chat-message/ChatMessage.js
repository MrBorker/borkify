import { useEffect, useRef, useState } from "react";
import { updateDoc, doc, Timestamp, setDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";

import { firestore } from "src/firebase";
import { selectChatId } from "src/redux/selects";
import { Ok, Edit } from "src/icons";

import styles from "./ChatMessage.module.css";

function ChatMessage({ type, text, time, id }) {
  const ref = useRef();
  const [isEdit, setIsEdit] = useState(false);
  const [newMessage, setNewMessage] = useState(text);

  const chatId = useSelector(selectChatId);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleSubmit = async () => {
    setIsEdit(false);
    await setDoc(
      doc(firestore, "chats", chatId),
      {
        [id]: {
          text: newMessage,
          date: Timestamp.now(),
        },
      },
      { merge: true }
    );
  };

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [text]);

  return (
    <div className={`${styles["message"]} ${styles[type]}`} ref={ref}>
      <div className={styles["wrapper"]}>
        {!isEdit && <p className={styles["text"]}>{text}</p>}
        {type === "out" &&
          (isEdit ? (
            <>
              <div className={styles["edit-wrapper"]}>
                {newMessage}
                <button onClick={handleSubmit} className={styles["btn"]}>
                  <Ok />
                </button>
              </div>
              <textarea
                className={styles["input"]}
                value={newMessage}
                onChange={(event) => {
                  setNewMessage(event.target.value);
                }}
              />
            </>
          ) : (
            <button className={styles["btn"]} onClick={handleEdit}>
              <Edit />
            </button>
          ))}
      </div>
      <span className={styles["time"]}>{time}</span>
    </div>
  );
}

export { ChatMessage };
