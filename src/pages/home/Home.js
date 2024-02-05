import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { Button, Modal, Shadow, Carousel } from "src/components/";
import { useAuth } from "src/contexts/AuthContext";
import { Github, Linkedin, Logo, Telegram, Burger, Close } from "src/icons";
import { testimonials, features, cta, navigation } from "./constants";

import styles from "./Home.module.css";

function Home() {
  const [isModalOn, setIsModalOn] = useState(false);
  const [isBurgerOn, setIsBurgerOn] = useState(false);
  const [isNewUser, setIsNewUser] = useState();

  const handleSignIn = () => {
    setIsModalOn(true);
    setIsNewUser(false);
  };

  const handleSignUp = () => {
    setIsModalOn(true);
    setIsNewUser(true);
  };

  const handleBurger = () => {
    setIsBurgerOn(!isBurgerOn);
  };

  useEffect(() => {
    document.body.style.overflow = isBurgerOn ? "hidden" : "auto";
  }, [isBurgerOn]);

  const { currentUser } = useAuth();

  if (currentUser) {
    return <Navigate to="/admin"></Navigate>;
  }

  return (
    <div className={styles["root"]}>
      <header className={styles["header"]}>
        <div className={styles["header-container"]}>
          <a href="/" className={styles["header-logo"]}>
            <Logo color="#fff" />
          </a>
          <nav
            className={`${styles["header-navigation"]} ${
              isBurgerOn ? "" : styles["hidden"]
            }`}
          >
            {navigation.map(({ href, text }) => {
              return (
                <a
                  href={href}
                  className={styles["header-navigation-link"]}
                  onClick={handleBurger}
                  key={text}
                >
                  {text}
                </a>
              );
            })}
            <button
              className={styles["header-close-btn"]}
              onClick={handleBurger}
            >
              <Close color="#fff" />
            </button>
          </nav>
          <a href="#cta" className={styles["header-btn"]}>
            app
          </a>
          <button
            className={styles["header-burger-btn"]}
            onClick={handleBurger}
          >
            <Burger />
          </button>
        </div>
      </header>
      <main className={styles["main"]}>
        <section className={styles["hero"]}>
          <div className={styles["hero-root"]}>
            <div className={styles["hero-container"]}>
              <h1 className={styles["hero-header"]}>Dog meetup application</h1>
              <p className={styles["hero-info"]}>
                Welcome to the space where tails are meant to wag and paws are
                meant to play. Whether you are a playful pup or a senior dog,
                borkify is your destination for unleashing the ultimate canine
                adventures.
              </p>
              <div className={styles["hero-btn-wrapper"]}>
                <a href="#reviews" className={styles["hero-btn"]}>
                  learn more
                </a>
                <a href="#cta" className={styles["hero-btn"]}>
                  join
                </a>
              </div>
            </div>
            <div className={styles["hero-images"]}>
              <div>
                <img
                  src="./assets/hero/hero-1.png"
                  className={styles["hero-image-vertical"]}
                  alt=""
                />
              </div>
              <div className={styles["hero-images-wrapper"]}>
                <div>
                  <img
                    src="./assets/hero/hero-2.png"
                    className={styles["hero-image-horizontal"]}
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="./assets/hero/hero-3.png"
                    className={styles["hero-image-horizontal"]}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={styles["features"]} id="features">
          <div className={styles["features-masonry"]}>
            {features.map(({ front, back, color, text, size }) => {
              return (
                <div
                  className={`${styles["features-card"]} ${styles[size]}`}
                  key={front}
                  style={{ color: color }}
                >
                  <div className={styles["rotate"]}>
                    <div className={styles["features-card-front"]}>
                      <img
                        src={front}
                        alt=""
                        className={styles["features-card-img-front"]}
                      />
                    </div>

                    <div className={styles["features-card-back"]}>
                      <img
                        src={back}
                        alt=""
                        className={styles["features-card-img-back"]}
                      />
                      <span className={styles["features-card-title"]}>
                        {text}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <section className={styles["testimonials"]} id="reviews">
          <Carousel array={testimonials} />
        </section>
        <section className={styles["cta"]} id="cta">
          <div className={styles["cta-images"]}>
            {cta.map(({ src, color, degree }) => {
              return (
                <div
                  className={styles["cta-image-wrapper"]}
                  style={{
                    backgroundColor: color,
                    transform: `rotate(${degree})`,
                  }}
                  key={src}
                >
                  <img src={src} alt="" className={styles["cta-image"]} />
                </div>
              );
            })}
          </div>
          <div className={styles["cta-info"]}>
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
                  <a href="#cta">
                    <Button
                      color="mint"
                      text="sign in"
                      onClick={handleSignIn}
                    />
                  </a>
                  <a href="#cta">
                    <Button
                      color="blue"
                      text="new bork"
                      onClick={handleSignUp}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          {isModalOn && (
            <Modal setIsModalOn={setIsModalOn} isNewUser={isNewUser} />
          )}
        </section>
      </main>
      <footer className={styles["footer"]}>
        <div className={styles["footer-container"]}>
          <span className={styles["footer-title"]}>
            Portfolio project <br />
            Depeloped by Anastasia Kondratiuk @mr-borker
          </span>
          <div className={styles["footer-links"]}>
            <a
              href="https://www.linkedin.com/in/anastasia-kondratiuk-6021a51b2/"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin />
            </a>
            <a
              href="https://github.com/MrBorker"
              target="_blank"
              rel="noreferrer"
            >
              <Github />
            </a>
            <a href="https://t.me/mr_borker" target="_blank" rel="noreferrer">
              <Telegram />
            </a>
          </div>
        </div>
      </footer>
      {isModalOn && <Shadow setIsModalOn={setIsModalOn} />}
    </div>
  );
}

export { Home };
