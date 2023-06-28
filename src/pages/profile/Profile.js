import styles from "./Profile.module.css";
import { breeds } from "../../config";
import { Button, InputRow, Message } from "../../components";
import { useAuth } from "../../contexts/AuthContext";
import { useDatabase } from "../../contexts/DatabaseContext";
import { useState, useEffect } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Profile() {
  const avatarDefault = "./assets/png/default-avatar.png";
  const { currentUser } = useAuth();
  const { updateUserData, readUserData } = useDatabase();
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [avatarToLoad, setAvatarToLoad] = useState(null);
  const [avatarLoaded, setAvatarLoaded] = useState();
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
    try {
      if (avatarToLoad) {
        await uploadBytes(
          ref(storage, `avatars/${currentUser.uid}`),
          avatarToLoad
        );
        const avatarUrl = await getDownloadURL(
          ref(storage, `avatars/${currentUser.uid}`)
        );
        await updateUserData({ userId: currentUser.uid, avatarUrl: avatarUrl });
      }
      await updateUserData({
        userId: currentUser.uid,
        userName: name,
        location: location,
        breed: breed,
        age: age,
        gender: gender,
        about: about,
      });
      setMessage("You data has been sucessfully saved");
    } catch (err) {
      console.log(err);
    }
  };

  // переместить на общий уровень загрузку данных + поместить их в хранилище

  useEffect(() => {
    if (!currentUser.uid) return;
    readUserData({ userId: currentUser.uid })
      .then((userData) => {
        setName(userData.val().userName);
        setLocation(userData.val().location);
        setBreed(userData.val().breed);
        setAge(userData.val().age);
        setGender(userData.val().gender);
        setAbout(userData.val().about);
        setAvatarLoaded(userData.val().avatarUrl);
      })
      .catch((error) => console.log(error));
  }, [readUserData, currentUser.uid]);

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={21}
              height={20}
              fill="none"
            >
              <path
                fill="#F85961"
                fillRule="evenodd"
                d="M15.521 2.872c.32-.324.75-.5 1.192-.488.442.012.862.21 1.167.55.305.341.47.797.46 1.267-.012.47-.198.917-.518 1.24L6.362 17.064l-2.953.413 1.21-3.6L15.52 2.874h.001Zm3.855-1.454A3.64 3.64 0 0 0 16.764.187a3.617 3.617 0 0 0-2.667 1.09L3.014 12.462a1.109 1.109 0 0 0-.262.427l-1.863 5.54a1.165 1.165 0 0 0 .17 1.062c.11.146.256.26.42.33.165.07.344.094.52.07l4.966-.694c.218-.03.42-.133.58-.293l11.704-11.87a4.092 4.092 0 0 0 1.157-2.78 4.115 4.115 0 0 0-1.03-2.836ZM12.212 17.7c-.274 0-.537.116-.731.322a1.136 1.136 0 0 0-.303.778c0 .292.109.572.303.778.194.206.457.322.731.322h6.209c.274 0 .537-.116.731-.322.194-.206.303-.486.303-.778 0-.291-.109-.571-.303-.778a1.005 1.005 0 0 0-.731-.322h-6.209Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        {error && <Message text={error} type="error" />}
        {message && <Message text={message} type="success" />}
        <InputRow
          htmlFor="name"
          type="text"
          id="name"
          labelText="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <InputRow
          htmlFor="location"
          type="text"
          id="location"
          labelText="location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
        <fieldset className={styles["row"]}>
          <label htmlFor="breed">breed</label>
          <input
            type="text"
            list="list"
            id="breed"
            value={breed}
            onChange={(event) => setBreed(event.target.value)}
          />
          <datalist id="list">
            {breeds.map((breed) => (
              <option key={breed.id} value={breed.name}></option>
            ))}
          </datalist>
        </fieldset>
        <InputRow
          htmlFor="age"
          type="text"
          id="age"
          labelText="age"
          value={age}
          onChange={(event) => setAge(event.target.value)}
        />
        <fieldset className={styles["row"]}>
          <span>gender</span>
          <div className={styles["gender"]}>
            <input
              className={styles["radio"]}
              type="radio"
              id="male"
              value="male"
              name="gender"
              checked={gender === "male"}
              onChange={(event) => setGender(event.target.value)}
            />
            <label htmlFor="male">mr. Woof</label>
            <input
              className={styles["radio"]}
              type="radio"
              id="female"
              value="female"
              name="gender"
              checked={gender === "female"}
              onChange={(event) => setGender(event.target.value)}
            />
            <label htmlFor="female">ms. Woof</label>
          </div>
        </fieldset>
        <InputRow
          htmlFor="about"
          type="textarea"
          id="about"
          labelText="about"
          value={about}
          onChange={(event) => setAbout(event.target.value)}
        />
        <Button color="rose" text="save" onClick={handleSubmit} />
      </form>
    </div>
  );
}

export { Profile };
