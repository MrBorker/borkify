import styles from "./Home.module.css";
import { Button, Logo, Modal, Shadow } from "../../components/";
import { useState } from "react";

function Home() {
  const [isModalOn, setIsModalOn] = useState(false);
  const [isNewUser, setIsNewUser] = useState();

  const handleSignIn = () => {
    setIsModalOn(1);
    setIsNewUser(false);
  };

  const handleSignUp = () => {
    setIsModalOn(1);
    setIsNewUser(true);
  };

  return (
    <div className={styles["root"]}>
      <div className={styles["images"]}>
        <div className={`${styles["violet"]} ${styles["image"]}`}>
          <img src="./assets/png/dog-1.png" alt="" />
        </div>
        <div className={`${styles["yellow"]} ${styles["image"]}`}>
          <img src="./assets/png/dog-2.png" alt="" />
        </div>
        <div className={`${styles["mint"]} ${styles["image"]}`}>
          <img src="./assets/png/dog-3.png" alt="" />
        </div>
        <div className={`${styles["orange"]} ${styles["image"]}`}>
          <img src="./assets/png/dog-4.png" alt="" />
        </div>{" "}
        <div className={`${styles["fucsia"]} ${styles["image"]}`}>
          <img src="./assets/png/dog-5.png" alt="" />
        </div>{" "}
        <div className={`${styles["blue"]} ${styles["image"]}`}>
          <img src="./assets/png/dog-6.png" alt="" />
        </div>
      </div>
      <div className={styles["info"]}>
        <div className={styles["content"]}>
          <div className={styles["logo"]}>
            <Logo />
          </div>
          <div className={styles["container"]}>
            <h1 className={styles["header"]}>
              Hi, fluffy <br /> buddy
            </h1>
            <h3 className={styles["title"]}>Join our pawsitive team</h3>
            <div className={styles["btn-wrapper"]}>
              <Button color="mint" text="sign in" onClick={handleSignIn} />
              <Button color="blue" text="new bork" onClick={handleSignUp} />
            </div>
          </div>
        </div>
      </div>
      {isModalOn && <Shadow setIsModalOn={setIsModalOn} />}
      {isModalOn && <Modal setIsModalOn={setIsModalOn} isNewUser={isNewUser} />}
    </div>
  );
}

export { Home };
