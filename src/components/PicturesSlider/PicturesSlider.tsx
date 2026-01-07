import React, { useState, useEffect } from 'react';
import styles from './PicturesSlider.module.scss';

const images = [
  'img/banner-phones.png',
  'img/banner-tablets.png',
  'img/banner-accessories.png',
];

export const PicturesSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatyczne przewijanie co 5 sekund (jak w wymaganiach)
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className={styles.slider}>
      <div className={styles.buttonsWrapper}>
        <button className={styles.button} onClick={handlePrev}>
          {/* Prosta strzałka w lewo */}
          &lt;
        </button>
        <div className={styles.imageContainer}>
          <img
            src={images[currentSlide]}
            alt="Banner"
            className={styles.image}
          />
        </div>
        <button className={styles.button} onClick={handleNext}>
          {/* Prosta strzałka w prawo */}
          &gt;
        </button>
      </div>

      {/* Kropeczki na dole (Pagination) */}
      <div className={styles.dots}>
        {images.map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};
