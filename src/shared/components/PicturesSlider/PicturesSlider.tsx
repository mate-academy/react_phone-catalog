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
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
      </div>

      <div className={styles.sliderGrid}>
        <div className={styles.leftCol} onClick={prevSlide}>
          <img
            src="/icons/ChevronArrowLeftSlider.svg"
            className={styles.arrowIcon}
            alt="ChevronArrowLeft"
          />
        </div>

        <div className={styles.sliderWrapper}>
          <div className={styles.sliderViewport}>
            <div
              className={styles.sliderTrack}
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className={styles.image}
                  alt={`Slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

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

        <div className={styles.rightCol} onClick={nextSlide}>
          <img
            className={styles.arrowIcon}
            src="/icons/ChevronArrowRight.svg"
            alt="ChevronArrowRight"
          />
        </div>
      </div>
    </div>
  );
};
