import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { breeds } from "src/config";
import { Button, InputRow, Message, SelectInput } from "src/components";
import { useAuth } from "src/contexts/AuthContext";
import { storage } from "src/firebase";
import { selectUserInfo } from "src/redux/selects";
import { addUserInfoToFirestore } from "src/redux/profileSlice";

import { LoadAvatar } from "src/icons";
import { avatarDefault } from "src/config";

import styles from "./Profile.module.css";

function Profile() {
  const dispatch = useDispatch();

  const { currentUser } = useAuth();
  const userInfo = useSelector(selectUserInfo);

  const [error, setError] = useState();
  const [message, setMessage] = useState();

  const [avatarToLoad, setAvatarToLoad] = useState(null);
  const [avatarLoaded, setAvatarLoaded] = useState("");
  const [avatarBeforeLoading, setAvatarBeforeLoading] = useState();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");

  const handleUpload = (event) => {
    event.preventDefault();
    setAvatarToLoad(event.target.files[0]);
  };

  useEffect(() => {
    if (!avatarToLoad) return;
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      setAvatarBeforeLoading(event.target.result);
    };
    fileReader.readAsDataURL(avatarToLoad);
  }, [avatarToLoad]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      if (avatarToLoad) {
        // Load avatar to firebase storage
        await uploadBytes(
          ref(storage, `avatars/${currentUser.uid}`),
          avatarToLoad
        );
        // Get avatar link in a storage
        const avatarUrl =
          (await getDownloadURL(ref(storage, `avatars/${currentUser.uid}`))) ||
          "";

        dispatch(
          addUserInfoToFirestore({
            userId: currentUser.uid || "",
            avatarUrl: avatarUrl || "",
          })
        );
      }

      // Check if all fields are filled
      if (!name || !location || !breed || !age || !gender || !about) {
        setError("Please fill all the fields to appear in search");
        return;
      }

      // Add form data to database throw redux toolkit
      await dispatch(
        addUserInfoToFirestore({
          userId: currentUser.uid || "",
          userName: name || "",
          location: location || "",
          breed: breed || "",
          age: age || "",
          gender: gender || "",
          about: about || "",
        })
      );

      setMessage("You data has been successfully saved");
      setTimeout(() => {
        setMessage("");
      }, 2000);
      console.log(breed);
    } catch (err) {
      console.log(err);
    }
  };

  // Get data from database and fill the form with saved values
  useEffect(() => {
    setName(userInfo?.userName);
    setLocation(userInfo?.location);
    setBreed(userInfo?.breed);
    setAge(userInfo?.age);
    setGender(userInfo?.gender);
    setAbout(userInfo?.about);
    setAvatarLoaded(userInfo?.avatarUrl);
  }, [userInfo]);

  return (
    <div className={styles["root"]}>
      <form action="" className={styles["form"]}>
        <div className={styles["avatar"]}>
          <img
            className={styles["avatar-img"]}
            src={avatarBeforeLoading || avatarLoaded || avatarDefault}
            alt=""
          />
          <input
            className={styles["avatar-input"]}
            type="file"
            id="avatar-file"
            onChange={handleUpload}
          />
          <label className={styles["avatar-label"]} htmlFor="avatar-file">
            <LoadAvatar />
          </label>
        </div>
        {error && <Message text={error} type="error" />}
        {message && <Message text={message} type="success" />}
        <InputRow
          htmlFor="name"
          type="text"
          id="name"
          labelText="name"
          value={name || ""}
          onChange={(event) => setName(event.target.value)}
        />
        <InputRow
          htmlFor="location"
          type="text"
          id="location"
          labelText="location"
          value={location || ""}
          onChange={(event) => setLocation(event.target.value)}
        />
        <fieldset className={styles["row"]}>
          <label htmlFor="breed">breed</label>
          {/* <input
            type="text"
            list="list"
            id="breed"
            value={breed || ""}
            onChange={(event) => setBreed(event.target.value)}
          /> */}
          <SelectInput isForProfile={true} breed={breed} setBreed={setBreed} />
        </fieldset>
        <InputRow
          htmlFor="age"
          type="number"
          id="age"
          labelText="age, years"
          value={age || ""}
          onChange={(event) => setAge(event.target.value)}
        />
        <fieldset className={styles["row"]}>
          <span>gender</span>
          <div className={styles["gender"]}>
            <input
              className={styles["radio"]}
              type="radio"
              id="Male"
              value="Male"
              name="gender"
              checked={gender === "Male"}
              onChange={(event) => setGender(event.target.value)}
            />
            <label htmlFor="Male">mr. Woof</label>
            <input
              className={styles["radio"]}
              type="radio"
              id="Female"
              value="Female"
              name="gender"
              checked={gender === "Female"}
              onChange={(event) => setGender(event.target.value)}
            />
            <label htmlFor="Female">ms. Woof</label>
          </div>
        </fieldset>
        <InputRow
          htmlFor="about"
          type="textarea"
          id="about"
          labelText="about"
          value={about || ""}
          onChange={(event) => setAbout(event.target.value)}
        />
        <Button color="rose" text="save" onClick={handleSubmit} />
      </form>
    </div>
  );
}

export { Profile };
