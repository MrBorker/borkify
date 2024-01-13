import { useState } from "react";
import { Navigate, Link } from "react-router-dom";

import { Button, Modal, Shadow, Carousel } from "src/components/";
import { useAuth } from "src/contexts/AuthContext";
import { Logo } from "src/icons";
import { testimonials } from "./constants";

import styles from "./Home.module.css";

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

  const { currentUser } = useAuth();

  if (currentUser) {
    return <Navigate to="/admin"></Navigate>;
  }

  return (
    <>
      <header className={styles["header"]}>
        <div className={styles["header-container"]}>
          <a href="/" className={styles["header-logo"]}>
            <Logo color="#fff" />
          </a>
          <nav className={styles["header-navigation"]}>
            <a href="/" className={styles["header-navigation-link"]}>
              Home
            </a>
            <a href="/" className={styles["header-navigation-link"]}>
              About
            </a>
            <a href="/" className={styles["header-navigation-link"]}>
              Features
            </a>
            <a href="#reviews" className={styles["header-navigation-link"]}>
              Reviews
            </a>
          </nav>
          <a href="#cta" className={styles["header-btn"]}>
            app
          </a>
        </div>
      </header>
      <main className={styles["root"]}>
        <section className={styles["hero"]}>
          <div className={styles["hero-root"]}>
            <div className={styles["hero-container"]}>
              <h1 className={styles["hero-header"]}>Dog meetup application</h1>
              <p className={styles["hero-info"]}>
                Borkify is your friendly neighbourhood dog meetup app! Match,
                chat and meet the dogs and their owners near you using
                geolocation.{" "}
              </p>
              <div className={styles["hero-btn-wrapper"]}>
                <Button
                  color="violet"
                  text="LEARN MORE"
                  onClick={handleSignIn}
                />
                <Button color="fucsia" text="JOIN" onClick={handleSignUp} />
              </div>
            </div>
            <div className={styles["hero-images"]}>
              <div>
                <img
                  src="./assets/png/hero-1.png"
                  className={styles["hero-image-vertical"]}
                  alt=""
                />
              </div>
              <div className={styles["hero-images-wrapper"]}>
                <div>
                  <img
                    src="./assets/png/hero-2.png"
                    className={styles["hero-image-horizontal"]}
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="./assets/png/hero-3.png"
                    className={styles["hero-image-horizontal"]}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={styles["testimonials"]} id="reviews">
          <Carousel array={testimonials} />
        </section>
        <section className={styles["cta"]}>
          <div className={styles["cta-images"]}>
            <div className={`${styles["violet"]} ${styles["cta-image"]}`}>
              <img src="./assets/png/dog-1.png" alt="" />
            </div>
            <div className={`${styles["yellow"]} ${styles["cta-image"]}`}>
              <img src="./assets/png/dog-2.png" alt="" />
            </div>
            <div className={`${styles["mint"]} ${styles["cta-image"]}`}>
              <img src="./assets/png/dog-3.png" alt="" />
            </div>
            <div className={`${styles["orange"]} ${styles["cta-image"]}`}>
              <img src="./assets/png/dog-4.png" alt="" />
            </div>
            <div className={`${styles["fucsia"]} ${styles["cta-image"]}`}>
              <img src="./assets/png/dog-5.png" alt="" />
            </div>
            <div className={`${styles["blue"]} ${styles["cta-image"]}`}>
              <img src="./assets/png/dog-6.png" alt="" />
            </div>
          </div>
          <div className={styles["cta-info"]} id="cta">
            <div className={styles["cta-content"]}>
              <div className={styles["cta-logo"]}>
                <Logo color="#E40066" />
              </div>
              <div>
                <h1 className={styles["cta-header"]}>
                  Wanna woof <br /> together?
                </h1>
                <h3 className={styles["cta-title"]}>Join our pawsitive team</h3>
                <div className={styles["cta-btn-wrapper"]}>
                  <Button color="mint" text="sign in" onClick={handleSignIn} />
                  <Button color="blue" text="new bork" onClick={handleSignUp} />
                </div>
              </div>
            </div>
          </div>
          {isModalOn && <Shadow setIsModalOn={setIsModalOn} />}
          {isModalOn && (
            <Modal setIsModalOn={setIsModalOn} isNewUser={isNewUser} />
          )}
        </section>
      </main>
    </>
  );
}

export { Home };
