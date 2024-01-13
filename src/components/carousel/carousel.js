import { useState } from "react";

import { Paw, Star, ArrowLeft, ArrowRight } from "src/icons";

import styles from "./carousel.module.css";

export const Carousel = ({ array }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const lastSlide = array.length - 1;

  const goToNextSlide = () => {
    currentSlide === lastSlide
      ? setCurrentSlide(0)
      : setCurrentSlide(currentSlide + 1);
  };

  const goToPreviousSlide = () => {
    currentSlide === 0
      ? setCurrentSlide(lastSlide)
      : setCurrentSlide(currentSlide - 1);
  };

  const goToSlide = (slide) => {
    setCurrentSlide(slide);
  };

  return (
    <div className={styles["root"]}>
      <div className={styles["container"]}>
        <div
          className={styles["img-container"]}
          style={{ color: array[currentSlide].color }}
        >
          <img src={array[currentSlide].img} alt="" className={styles["img"]} />
        </div>
        <div className={styles["content-container"]}>
          <div className={styles["content"]}>
            <div className={styles["rating"]}>
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
            <p className={styles["info"]}>{array[currentSlide].text}</p>
            <span className={styles["note"]}>{array[currentSlide].name}</span>
          </div>
          <div className={styles["pagination"]}>
            {array.map((item, index) => {
              return (
                <button key={index} onClick={() => goToSlide(index)}>
                  <Paw
                    color={
                      currentSlide === index
                        ? array[currentSlide].color
                        : "#A3A3A3"
                    }
                  />
                </button>
              );
            })}
          </div>
        </div>
        <div className={styles["btn-container"]}>
          <button onClick={goToPreviousSlide}>
            <ArrowLeft color={array[currentSlide].color} />
          </button>
          <button onClick={goToNextSlide}>
            <ArrowRight color={array[currentSlide].color} />
          </button>
        </div>
      </div>
    </div>
  );
};
