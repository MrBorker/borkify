import styles from "./Chats.module.css";
import { ChatPreview, ChatMessage } from "../../components";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { firestore } from "../../firebase";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

function Chats() {
  const { currentUser } = useAuth();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const chatsRef = collection(firestore, "chats");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newMessage === "") return;
    try {
      await addDoc(chatsRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: currentUser.uid,
      });
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   const queryMessages = query(
  //     chatsRef,
  //     where("user", "==", currentUser.uid),
  //     orderBy("createdAt")
  //   );
  //   const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
  //     let messages = [];
  //     snapshot.forEach((doc) => {
  //       messages.push({ ...doc.data(), id: doc.id });
  //     });
  //     setMessages(messages);
  //   });

  //   return () => unsubscribe();
  // }, []);

  return (
    <div className={styles["root"]}>
      <input
        type="search"
        placeholder="Search..."
        className={styles["search"]}
      />
      <div className={styles["header"]}>
        <div className={styles["avatar"]}>
          <img
            src="../assets/png/dog-7.png"
            alt=""
            className={styles["avatar-img"]}
          />
        </div>
        <div className={styles["info"]}>
          <h4 className={styles["title"]}>Karl Joseph Richard Westminster</h4>
          <span className={styles["status"]}>Online</span>
        </div>
      </div>
      <div className={styles["preview"]}>
        <ChatPreview
          title="Wr Woofer"
          message="Sorry about your stick, it was so fra..."
          avatar="../assets/png/dog-1.png"
          unread="true"
        />
        <ChatPreview
          title="Peanut"
          message="Peanut is typing..."
          avatar="../assets/png/dog-2.png"
          unread="true"
        />
        <ChatPreview
          title="Winston"
          message="I recommend Royal Canine treats, b..."
          avatar="../assets/png/dog-6.png"
          unread="true"
        />
      </div>
      <div className={styles["selected"]}>
        <div className={styles["chat"]}>
          <ChatMessage
            type="in"
            text="Hi, Bro! Wanna play with we and the gang in a park today?"
            time="Yesterday 09:03"
          />
          <ChatMessage
            type="out"
            text="Hello! I’m on my way."
            time="Yesterday 09:08"
          />
          {messages.map((message) => (
            <ChatMessage
              type="out"
              text={message.text}
              time="Yesterday 09:08"
            />
          ))}
        </div>
        <form
          action=""
          className={styles["new-message-form"]}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Send a message..."
            value={newMessage}
            className={styles["new-message-input"]}
            onChange={(event) => setNewMessage(event.target.value)}
          ></input>
          <button className={styles["new-message-btn"]} type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={27}
              height={26}
              fill="none"
            >
              <path
                fill="#848484"
                d="M26.896 13c0-1.418-1.28-1.9-1.28-1.9L.016.967 4.627 11.81 16.655 13 4.629 14.19.015 25.034l25.6-10.134s1.28-.482 1.28-1.9Z"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export { Chats };
