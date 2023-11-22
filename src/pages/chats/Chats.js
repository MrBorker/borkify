import { selectChat } from "../../redux/chatSlice";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Chats.module.css";
import { getFormatedDate } from "../../helpers/getFormatedDate";

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
import { v4 as uuid } from "uuid";

import {
  selectUserInfo,
  selectCollaboratorInfo,
  selectChatId,
} from "../../redux/selects";

function Chats() {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const userInfo = useSelector(selectUserInfo);
  const collaboratorInfo = useSelector(selectCollaboratorInfo);
  const chatId = useSelector(selectChatId);

  const dispatch = useDispatch();

  useEffect(() => {
    const getChats = () => {
      const unsubscribe = onSnapshot(
        doc(firestore, "userChats", userInfo.userId),
        (doc) => {
          setChats(doc.data());
        }
      );
      return () => {
        unsubscribe();
      };
    };

    userInfo.userId && getChats();
  }, [userInfo.userId]);

  const handleSelect = (user, chatId) => {
    userInfo && dispatch(selectChat({ collaboratorInfo: user, chatId }));
    setIsSelected(true);
  };

  useEffect(() => {
    const getMessages = () => {
      const unsubscribe = onSnapshot(doc(firestore, "chats", chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });
      return () => {
        unsubscribe();
      };
    };

    chatId && getMessages();
  }, [chatId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newMessage) return;
    try {
      await updateDoc(doc(firestore, "chats", chatId), {
        messages: arrayUnion({
          id: uuid(),
          text: newMessage,
          senderId: userInfo.userId,
          date: Timestamp.now(),
        }),
      });
      await updateDoc(doc(firestore, "userChats", userInfo.userId), {
        [chatId + ".lastMessage"]: {
          text: newMessage,
        },
        [chatId + ".date"]: serverTimestamp(),
      });
      await updateDoc(doc(firestore, "userChats", collaboratorInfo.userId), {
        [chatId + ".lastMessage"]: {
          text: newMessage,
        },
        [chatId + ".date"]: serverTimestamp(),
      });
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

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
              src={collaboratorInfo.photoUrl}
              alt=""
              className={styles["avatar-img"]}
            />
          </div>
        )}
        {isSelected && (
          <div className={styles["info"]}>
            <h4 className={styles["title"]}>{collaboratorInfo.displayName}</h4>
            <span className={styles["status"]}>Online</span>
          </div>
        )}
      </div>

      <div className={styles["preview"]}>
        {chats &&
          Object.entries(chats)
            ?.sort((a, b) => b.date - a.date)
            .map((chat) => (
              <ChatPreview
                key={chat[0]}
                onClick={() => handleSelect(chat[1].userInfo, chat[0])}
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
            {messages &&
              messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  type={message.senderId === userInfo.userId ? "out" : "in"}
                  text={message.text}
                  time={getFormatedDate(message.date.toDate())}
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
