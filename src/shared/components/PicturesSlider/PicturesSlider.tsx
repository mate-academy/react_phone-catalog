import React, { useState, useEffect, useCallback } from 'react';
import styles from './PicturesSlider.module.scss';

const BANNER_IMAGES = [
  'img/banner-phones.png',
  'img/banner-tablets.png',
  'img/banner-accessories.png',
];

export const PicturesSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % BANNER_IMAGES.length);
  }, []);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? BANNER_IMAGES.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (isHovered) {
      return;
    }

    const intervalId = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [isHovered, handleNext]);

  return (
    <div
      className={styles.picturesSlider}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.wrapper}>
        <button type="button" className={styles.button} onClick={handlePrev}>
          <img
            src="img/icons/Chevron (Arrow Right).svg"
            alt="Previous"
            className={styles.arrowLeft}
          />
        </button>

        <div className={styles.imageContainer}>
          <img
            src={`${BANNER_IMAGES[currentIndex]}`}
            alt="Banner"
            className={styles.image}
          />
        </div>

        <button type="button" className={styles.button} onClick={handleNext}>
          <img
            src="img/icons/Chevron (Arrow Right).svg"
            alt="Next"
            className={styles.arrowRight}
          />
        </button>
      </div>

      <div className={styles.pagination}>
        {BANNER_IMAGES.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`${styles.dash} ${
              index === currentIndex ? styles.dashActive : ''
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
