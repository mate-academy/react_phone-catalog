import React, { useState } from "react";
import styles from "./PicturesSlider.module.scss";

export const PicturesSlider: React.FC = () => {
  function handleArrowClick(direction: 'left' | 'right') {
    if (direction === 'left') {
      setCurrentPicture(currentPicture === 0 ? 2 : currentPicture - 1);
    }

    if (direction === 'right') {
      setCurrentPicture(currentPicture === 2 ? 0 : currentPicture + 1);
    }
  }

  const [currentPicture, setCurrentPicture] = useState(0);

  return (
    <div className={styles.slider}>
      <div className={styles.carousel}>
        <button 
          className={`${styles.arrow} ${styles.isTablet}`}
          onClick={() => handleArrowClick('left')}
        >
          <img
            src="../../../../public/img/icons/Arrow-left.svg"
            alt="Arrow"
            className={styles.img}
          />
        </button>
        <div className={styles.products}>
          <ul>
            <li></li>
          </ul>
        </div>
        <button 
          className={`${styles.arrow} ${styles.isTablet}`}
          onClick={() => handleArrowClick('right')}
        >
          <img
            src="../../../../public/img/icons/Arrow-right.svg"
            alt="Arrow"
            className={styles.img}
          />
        </button>
      </div>

      <div className={styles.dashes}>
        <div
          onClick={() => setCurrentPicture(0)}
          className={`${styles.dash} ${currentPicture === 0 ? styles.activeDash : ''}`}
        >
        </div>
        <div
          onClick={() => setCurrentPicture(1)}
          className={`${styles.dash} ${currentPicture === 1 ? styles.activeDash : ''}`}
        >
        </div>
        <div
          onClick={() => setCurrentPicture(2)}
          className={`${styles.dash} ${currentPicture === 2 ? styles.activeDash : ''}`}
        >
        </div>
      </div>
    </div>
  );
};
