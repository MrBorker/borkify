import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { Ok, Edit } from "src/icons";
import {
  updateChatInfo,
  setMessage,
  addMessageToChat,
} from "src/redux/chatSlice";

import styles from "./ChatMessage.module.css";

function ChatMessage({ type, text, time, id, isLast, userId, collaboratorId }) {
  const dispatch = useDispatch();

  const ref = useRef();
  const [isEdit, setIsEdit] = useState(false);
  const [newMessage, setNewMessage] = useState(text);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleSubmit = async () => {
    setIsEdit(false);
    dispatch(setMessage(newMessage));
    try {
      await dispatch(addMessageToChat(id));
      if (isLast) {
        await dispatch(updateChatInfo(userId));
        await dispatch(updateChatInfo(collaboratorId));
      }
    } catch (error) {
      console.log(error);
    }
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
