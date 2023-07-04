import styles from "./Chats.module.css";
import { ChatPreview, ChatMessage } from "../../components";
import {
  serverTimestamp,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";
import { firestore } from "../../firebase";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useChat } from "../../contexts/ChatContext";
import { v4 as uuid } from "uuid";

function Chats() {
  const { currentUser } = useAuth();
  const { dispatch, data } = useChat();

  const [chats, setChats] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
    setIsSelected(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newMessage) return;
    try {
      await updateDoc(doc(firestore, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text: newMessage,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
      await updateDoc(doc(firestore, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text: newMessage,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
      //  !! update for the other user to implement
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getChats = () => {
      const unsubscribe = onSnapshot(
        doc(firestore, "userChats", currentUser.uid),
        (doc) => {
          setChats(doc.data());
        }
      );
      return () => {
        unsubscribe();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  useEffect(() => {
    const getMessages = () => {
      const unsubscribe = onSnapshot(
        doc(firestore, "chats", data.chatId),
        (doc) => {
          doc.exists() && setMessages(doc.data().messages);
        }
      );
      return () => {
        unsubscribe();
      };
    };

    data.chatId && getMessages();
  }, [data.chatId]);

  return (
    <div className={styles["root"]}>
      <input
        type="search"
        placeholder="Search..."
        className={styles["search"]}
      />

      <div className={styles["header"]}>
        {isSelected && (
          <div className={styles["avatar"]}>
            <img
              src={data.user?.photoUrl}
              alt=""
              className={styles["avatar-img"]}
            />
          </div>
        )}
        {isSelected && (
          <div className={styles["info"]}>
            <h4 className={styles["title"]}>{data.user?.displayName}</h4>
            <span className={styles["status"]}>Online</span>
          </div>
        )}
      </div>

      <div className={styles["preview"]}>
        {Object.entries(chats)
          ?.sort((a, b) => b.date - a.date)
          .map((chat) => (
            <ChatPreview
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
              title={chat[1].userInfo?.displayName}
              message={chat[1].lastMessage?.text}
              avatar={chat[1].userInfo?.photoUrl}
              unread="true"
            />
          ))}
      </div>
      {isSelected && (
        <div className={styles["selected"]}>
          <div className={styles["chat"]}>
            {/* <ChatMessage
              type="in"
              text="Hi, Bro! Wanna play with we and the gang in a park today?"
              time="Yesterday 09:03"
            />
            <ChatMessage
              type="out"
              text="Hello! I’m on my way."
              time="Yesterday 09:08"
            /> */}
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                type={message.senderId === currentUser.uid ? "out" : "in"}
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
      )}
    </div>
  );
}

export { Chats };
