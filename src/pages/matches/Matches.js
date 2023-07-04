import styles from "./Matches.module.css";
import { SwipeBtn } from "../../components";
import { useAuth } from "../../contexts/AuthContext";
import { firestore } from "../../firebase";
import {
  setDoc,
  doc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";

function Matches() {
  const { currentUser } = useAuth();

  const [usersArray, setUsersArray] = useState([]);
  const [usersCounter, setUsersCounter] = useState(0);

  // I should do a query to firebase to have info about user a) to fill a block b) to handle click aka pick uid and create a new chat

  const handleSelect = async (user) => {
    // Add current user to chats
    // Create a new entry in database userChats uid + uid
    const combinedId =
      currentUser.uid < usersArray[usersCounter]?.userId
        ? currentUser.uid + usersArray[usersCounter]?.userId
        : usersArray[usersCounter]?.userId + currentUser.uid;
    try {
      await setDoc(doc(firestore, "chats", combinedId), {
        messages: [],
      });
      await setDoc(
        doc(firestore, "userChats", currentUser.uid),
        {
          [combinedId]: {
            userInfo: {
              uid: usersArray[usersCounter]?.userId,
              displayName: usersArray[usersCounter]?.userName,
              photoUrl: usersArray[usersCounter]?.avatarUrl,
            },
            date: serverTimestamp(),
          },
        },
        { merge: true }
      );
      await setDoc(
        doc(firestore, "userChats", usersArray[usersCounter]?.userId),
        {
          [combinedId]: {
            userInfo: {
              uid: currentUser.uid,
              displayName: usersArray[usersCounter]?.userName,
              photoUrl: usersArray[usersCounter]?.avatarUrl,
            },
            date: serverTimestamp(),
          },
        },
        { merge: true }
      );

      // The next user should be shown or a message
      setUsersCounter(usersCounter + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const handleReject = (user) => {
    // Add current user to rejected list
    console.log(usersArray);
  };

  useEffect(() => {
    getDocs(
      query(collection(firestore, "users"), where("gender", "==", "Male"))
    )
      .then((result) => {
        const array = [];
        result.forEach((user) => {
          if (user.data().userId !== currentUser.uid) array.push(user.data());
        });
        setUsersArray(array);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className={styles["root"]}>
      <div className={styles["avatar"]}>
        <img
          className={styles["avatar-img"]}
          src={usersArray[usersCounter]?.avatarUrl}
          alt=""
        />
        <SwipeBtn type="select" onClick={handleSelect} />
        <SwipeBtn type="reject" onClick={handleReject} />
      </div>
      <div className={styles["info"]}>
        <h4 className={styles["header"]}>
          {usersArray[usersCounter]?.userName}
        </h4>
        <div className={styles["bio"]}>
          <div className={styles["bio-raw"]}>
            <div className={styles["bio-icon"]}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={30}
                height={30}
                fill="none"
              >
                <path
                  fill="#E6BAC6"
                  d="M0 15h3.75L15 2.16 26.25 15H30L16.89 0h-3.75L0 15Zm3.75 15h7.5v-9.36c0-.52.18-.96.54-1.32.36-.36.81-.55 1.35-.57h3.75c.5 0 .94.19 1.32.57.38.38.56.82.54 1.32V30h7.5V17.43L15 5.01 3.75 17.43V30ZM24.39 5.73l3.75 4.29V1.89h-3.75v3.84Z"
                />
              </svg>
            </div>
            <span className={styles["title"]}>
              {usersArray[usersCounter]?.location}
            </span>
          </div>
          <div className={styles["bio-raw"]}>
            <div className={styles["bio-icon"]}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={27}
                height={30}
                fill="none"
              >
                <path
                  fill="#E6BAC6"
                  d="M18.83 0v2.75h2.97l-2.568 2.318a10.884 10.884 0 0 0-3.73-2.542 11.914 11.914 0 0 0-4.564-.901C4.908 1.625 0 6.055 0 11.5c0 4.979 4.103 9.108 9.415 9.779v2.346H5.954v2.75h3.461V30h3.046v-3.625h3.462v-2.75h-3.462v-2.346c5.313-.671 9.416-4.8 9.416-9.779 0-1.4-.33-2.783-.97-4.058l3.047-2.75v2.683H27V0h-8.17ZM10.94 18.625a8.509 8.509 0 0 1-4.385-1.2c-1.298-.784-2.31-1.897-2.907-3.198a6.484 6.484 0 0 1-.45-4.117c.305-1.382 1.057-2.652 2.16-3.648 1.105-.997 2.51-1.675 4.042-1.95a8.685 8.685 0 0 1 4.56.405c1.442.54 2.675 1.453 3.542 2.625.867 1.171 1.33 2.549 1.33 3.958-.003 1.889-.835 3.7-2.314 5.036-1.48 1.335-3.486 2.087-5.579 2.089Z"
                />
              </svg>
            </div>
            <span className={styles["title"]}>
              {usersArray[usersCounter]?.gender}
            </span>
          </div>
          <div className={styles["bio-raw"]}>
            <div className={styles["bio-icon"]}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={32}
                height={28}
                fill="none"
              >
                <g fill="#E6BAC6">
                  <path d="M11.963 7.576c1.817-.697 2.786-2.91 2.163-4.944C13.504.6 11.526-.486 9.708.212 7.891.906 6.922 3.12 7.544 5.153c.623 2.034 2.6 3.117 4.419 2.422ZM6.4 13.634c1.044-1.804.582-4.215-1.03-5.382C3.755 7.084 1.601 7.6.557 9.405-.485 11.21-.023 13.62 1.59 14.786c1.613 1.169 3.767.652 4.81-1.152ZM20.038 7.576c1.817.695 3.795-.388 4.418-2.422.622-2.033-.347-4.247-2.165-4.943-1.817-.697-3.795.389-4.417 2.421-.623 2.034.346 4.247 2.164 4.944ZM16 9.49c-5.498 0-11.566 8.517-9.81 14.578 1.697 5.851 6.995 3.44 9.81 3.44 2.815 0 8.113 2.411 9.809-3.44 1.756-6.06-4.31-14.579-9.809-14.579ZM31.442 9.405c-1.044-1.805-3.198-2.32-4.811-1.153-1.613 1.167-2.075 3.578-1.03 5.383v-.001c1.043 1.804 3.197 2.32 4.81 1.152 1.612-1.167 2.074-3.576 1.03-5.38Z" />
                </g>
              </svg>
            </div>
            <span className={styles["title"]}>
              {usersArray[usersCounter]?.breed}
            </span>
          </div>
          <div className={styles["bio-raw"]}>
            <div className={styles["bio-icon"]}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={26}
                height={30}
                fill="none"
              >
                <path
                  fill="#E6BAC6"
                  d="m23.153 5.18.418-1.51h1.822c.341 0 .607-.253.607-.576V.576C26 .252 25.734 0 25.393 0H.607C.266 0 0 .252 0 .576v2.518c0 .323.266.575.607.575H2.43l.418 1.51c1.062 4.174 4.213 7.483 8.464 8.958v1.367c-4.213 1.474-7.364 4.784-8.464 8.956l-.532 1.87H.607c-.341 0-.607.253-.607.577v2.517c0 .324.266.576.607.576h24.786c.341 0 .607-.252.607-.576v-2.517c0-.324-.266-.576-.607-.576h-1.708l-.494-1.907c-1.138-4.136-4.289-7.446-8.502-8.92v-1.367c4.213-1.475 7.364-4.784 8.464-8.957ZM1.215 1.15h23.532v1.331H1.215v-1.33Zm23.57 27.698H1.253v-1.331h23.532v1.33ZM13.93 16.403c4.061 1.259 7.098 4.388 8.123 8.31l.417 1.618H3.492l.417-1.619c1.063-3.92 4.1-7.05 8.123-8.31a.544.544 0 0 0 .38-.503v-2.122a.544.544 0 0 0-.38-.504c-4.023-1.33-7.06-4.424-8.085-8.345L3.606 3.67h18.788l-.341 1.26c-1.025 3.92-4.062 7.013-8.123 8.308a.544.544 0 0 0-.38.504v2.122c0 .252.152.468.38.54Z"
                />
              </svg>
            </div>
            <span className={styles["title"]}>
              {usersArray[usersCounter]?.age} years
            </span>
          </div>
          <div className={styles["bio-raw"]}>
            <div className={styles["bio-icon"]}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={30}
                height={30}
                fill="none"
              >
                <path
                  fill="#E6BAC6"
                  d="M24.023 30v-2.434h-1.215V30h-1.216v-2.434h-1.219V30h-1.14v-3.65h-1.217V30H16.8v-2.434h-1.216V30h-1.141v-2.434h-1.216V30h-1.218v-3.65h-1.216V30H9.577v-2.434H8.438V30H7.222v-2.434H6.005V30H4.789v-3.65H3.65V30H0V0l30 30h-5.977ZM4.789 11.502v13.632H18.42L4.79 11.502Z"
                />
              </svg>
            </div>
            <span className={styles["title"]}>Large</span>
          </div>
        </div>
        <p className={styles["about"]}>{usersArray[usersCounter]?.about}</p>
      </div>
    </div>
  );
}

export { Matches };
