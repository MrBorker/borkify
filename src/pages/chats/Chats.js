import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  serverTimestamp,
  onSnapshot,
  doc,
  updateDoc,
  setDoc,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";

import { selectChat } from "src/redux/chatSlice";
import { getFormatedDate } from "src/helpers/getFormatedDate";
import { ChatPreview, ChatMessage } from "src/components";
import { firestore } from "src/firebase";
import {
  selectUserInfo,
  selectCollaboratorInfo,
  selectChatId,
} from "src/redux/selects";
import { ArrowBack, SendBtn } from "src/icons";

import styles from "./Chats.module.css";

function Chats() {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [search, setSearch] = useState("");
  const [isSending, setisSending] = useState(false);

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

  const handleSelect = async (user, chatId) => {
    userInfo && dispatch(selectChat({ collaboratorInfo: user, chatId }));
    setIsSelected(true);
    // try {
    //   await setDoc(
    //     doc(firestore, "chats", chatId),
    //     {
    //       [id]: {
    //         id: id,
    //         text: newMessage,
    //         senderId: userInfo.userId,
    //         date: Timestamp.now(),
    //         isNew: true,
    //       },
    //     },
    //     { merge: true }
    //   );
    // } catch {}
  };

  useEffect(() => {
    const getMessages = () => {
      const unsubscribe = onSnapshot(doc(firestore, "chats", chatId), (doc) => {
        doc.exists() && setMessages(doc.data());
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
    if (!newMessage.trim()) return;
    setisSending(true);
    try {
      const id = Timestamp.now();
      await setDoc(
        doc(firestore, "chats", chatId),
        {
          [id]: {
            id: id,
            text: newMessage.trim(),
            senderId: userInfo.userId,
            date: Timestamp.now(),
            isNew: true,
          },
        },
        { merge: true }
      );
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
      setisSending(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    setIsSelected(false);
  };

  return (
    <div className={styles["root"]}>
      <div className={styles["preview-panel"]}>
        <div className={styles["search-container"]}>
          <input
            type="search"
            placeholder="Search..."
            className={styles["search"]}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>

        <div className={styles["list"]}>
          {chats &&
            Object.values(chats)
              ?.sort((a, b) => b.date - a.date)
              .map(({ chatId, userInfo, lastMessage }) => {
                if (
                  lastMessage?.text.toLowerCase().includes(search) ||
                  userInfo?.displayName.toLowerCase().includes(search) ||
                  !search
                ) {
                  return (
                    <ChatPreview
                      key={chatId}
                      onClick={() => handleSelect(userInfo, chatId)}
                      title={userInfo?.displayName}
                      message={lastMessage?.text}
                      avatar={userInfo?.photoUrl}
                      unread="true"
                    />
                  );
                }
                return false;
              })}
        </div>
      </div>

      {isSelected && (
        <div className={styles["chat-panel"]}>
          <div className={styles["header"]}>
            <button className={styles["back-btn"]} onClick={handleBack}>
              <ArrowBack />
            </button>
            <div className={styles["avatar"]}>
              <img
                src={collaboratorInfo.photoUrl}
                alt=""
                className={styles["avatar-img"]}
              />
            </div>
            <div className={styles["info"]}>
              <h4 className={styles["title"]}>
                {collaboratorInfo.displayName}
              </h4>
              {/* <span className={styles["status"]}>Online</span> */}
            </div>
          </div>

          <div className={styles["selected"]}>
            <div className={styles["chat"]}>
              {messages &&
                Object.values(messages)
                  ?.sort((a, b) => a.id - b.id)
                  .map(({ id, senderId, text, date }) => (
                    <ChatMessage
                      key={id}
                      id={id}
                      type={senderId === userInfo.userId ? "out" : "in"}
                      text={text}
                      time={getFormatedDate(date.toDate())}
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
              <button
                className={styles["new-message-btn"]}
                type="submit"
                disabled={isSending}
              >
                <SendBtn />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export { Chats };
