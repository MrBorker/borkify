import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

import { firestore } from "src/firebase";
import { selectUserInfo, selectCollaborators } from "src/redux/selects";
import { addCollaboratorToShownList } from "src/redux/matchSlice";
import { SwipeBtn, Filter, Notification } from "src/components";
import { Breed, FilterBtn, Gender, Location, Age, Size } from "src/icons";
import { defaultAvatarMatch } from "src/config";

import styles from "./Matches.module.css";

function Matches() {
  const dispatch = useDispatch();

  const collaborators = useSelector(selectCollaborators);
  const userInfo = useSelector(selectUserInfo);

  const [filterMode, setFilterMode] = useState(true);
  const [userList, setUserList] = useState(null);

  const handleSelect = async (user) => {
    // Add shown profile to shown list
    await dispatch(addCollaboratorToShownList(userList[0]?.userId));

    // Generate id of a chat
    const combinedId =
      userInfo.userId < userList[0]?.userId
        ? userInfo.userId + userList[0]?.userId
        : userList[0]?.userId + userInfo.userId;

    // Create a chat in database
    try {
      await setDoc(doc(firestore, "chats", combinedId), {});
      await setDoc(
        doc(firestore, "userChats", userInfo.userId),
        {
          [combinedId]: {
            userInfo: {
              userId: userList[0]?.userId || "",
              displayName: userList[0]?.userName || "",
              photoUrl: userList[0]?.avatarUrl || "",
            },
            date: serverTimestamp(),
            chatId: combinedId || "",
          },
        },
        { merge: true }
      );
      await setDoc(
        doc(firestore, "userChats", userList[0]?.userId),
        {
          [combinedId]: {
            userInfo: {
              userId: userInfo.userId || "",
              displayName: userInfo.userName || "",
              photoUrl: userInfo.avatarUrl || "",
            },
            date: serverTimestamp(),
            chatId: combinedId || "",
          },
        },
        { merge: true }
      );

      setUserList(userList.slice(1));
    } catch (err) {
      console.log(err);
    }
  };

  const handleReject = async (user) => {
    // Add shown profile to shown list
    await dispatch(addCollaboratorToShownList(userList[0]?.userId));

    setUserList(userList.slice(1));
  };

  const handleFilter = () => {
    setFilterMode(true);
  };

  useEffect(() => {
    setUserList(collaborators);
  }, [collaborators]);

  // Check if the user filled profile

  return (
    <div className={styles["root"]}>
      {(userInfo &&
        (filterMode ? (
          <Filter setFilterMode={setFilterMode}></Filter>
        ) : userList.length > 0 ? (
          <div className={styles["presentation"]}>
            <div className={styles["avatar"]}>
              <img
                className={styles["avatar-img"]}
                src={userList[0]?.avatarUrl || defaultAvatarMatch}
                alt=""
              />
              <SwipeBtn type="select" onClick={handleSelect} />
              <SwipeBtn type="reject" onClick={handleReject} />
            </div>
            <div className={styles["info"]}>
              <div className={styles["header-container"]}>
                <h4 className={styles["header"]}>{userList[0]?.userName}</h4>
                <button className={styles["filter-btn"]} onClick={handleFilter}>
                  <FilterBtn />
                </button>
              </div>
              <div className={styles["bio"]}>
                <div className={styles["bio-raw"]}>
                  <div className={styles["bio-icon"]}>
                    <Location />
                  </div>
                  <span className={styles["title"]}>
                    {userList[0]?.location}
                  </span>
                </div>
                <div className={styles["bio-raw"]}>
                  <div className={styles["bio-icon"]}>
                    <Gender />
                  </div>
                  <span className={styles["title"]}>{userList[0]?.gender}</span>
                </div>
                <div className={styles["bio-raw"]}>
                  <div className={styles["bio-icon"]}>
                    <Breed />
                  </div>
                  <span className={styles["title"]}>{userList[0]?.breed}</span>
                </div>
                <div className={styles["bio-raw"]}>
                  <div className={styles["bio-icon"]}>
                    <Age />
                  </div>
                  <span className={styles["title"]}>
                    {userList[0]?.age} years
                  </span>
                </div>
                <div className={styles["bio-raw"]}>
                  <div className={styles["bio-icon"]}>
                    <Size />
                  </div>
                  <span className={styles["title"]}>Large</span>
                </div>
              </div>
              <p className={styles["about"]}>{userList[0]?.about}</p>
            </div>
          </div>
        ) : (
          <Notification
            text="Oops, we don’t have a doggo for your request. Try to expand filter."
            onClick={handleFilter}
            withBtn={true}
          />
        ))) || (
        <Notification
          text="To start searching for doggos please fill the profile."
          onClick={handleFilter}
          withBtn={false}
        />
      )}
    </div>
  );
}

export { Matches };
