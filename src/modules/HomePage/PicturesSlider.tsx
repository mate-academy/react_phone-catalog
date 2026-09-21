import React, { useState, useEffect } from 'react';
import styles from './PicturesSlider.module.scss';

const banners = [
  './img/banner-phones.png',
  './img/banner-tablets.png',
  './img/banner-accessories.png',
];

export const PicturesSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % banners.length);
  };

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderWrapper}>
        <button
          type="button"
          className={`${styles.navButton} ${styles.prev}`}
          onClick={handlePrev}
          aria-label="Previous banner"
        >
          ‹
        </button>

        <div className={styles.imageBox}>
          <img
            src={banners[currentIndex]}
            alt={`Banner ${currentIndex + 1}`}
            className={styles.bannerImage}
          />
        </div>

        <button
          type="button"
          className={`${styles.navButton} ${styles.next}`}
          onClick={handleNext}
          aria-label="Next banner"
        >
          ›
        </button>
      </div>

      <div className={styles.dots}>
        {banners.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`${styles.dot} ${currentIndex === index ? styles.dotActive : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
