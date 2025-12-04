import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './PicturesSlider.module.scss';

const images = [
  '/img/banner-home.png',
  '/img/banner-phones.png',
  '/img/banner-tablets.png',
  '/img/banner-accessories.png',
];

export const PicturesSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrent(prev => (prev + 1) % images.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent(prev => (prev - 1 + images.length) % images.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    timerRef.current = setInterval(nextSlide, 5000);
  }, [stopTimer, nextSlide]);

  useEffect(() => {
    startTimer();

    return () => stopTimer();
  }, [startTimer, stopTimer]);

  return (
    <div className={styles.sliderSection}>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>

      <div className={`${styles.sliderContainer} ${styles.sliderGrid}`}>
        <div
          className={styles.sliderWrapper}
          onMouseEnter={stopTimer}
          onMouseLeave={startTimer}
        >
          <div className={styles.sliderViewport}>
            <div
              className={styles.sliderTrack}
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Banner ${idx + 1}`}
                  className={styles.image}
                />
              ))}
            </div>
          </div>

          <button
            className={`${styles.arrow} ${styles.left}`}
            onClick={prevSlide}
          >
            &#10094;
          </button>

          <button
            className={`${styles.arrow} ${styles.right}`}
            onClick={nextSlide}
          >
            &#10095;
          </button>

          <div className={styles.dots}>
            {images.map((_, slideIndex) => (
              <span
                key={slideIndex}
                className={`${styles.dot} ${current === slideIndex ? styles.active : ''}`}
                onClick={() => goToSlide(slideIndex)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
