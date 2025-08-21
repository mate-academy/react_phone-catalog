import React, { useState, useEffect, useRef } from 'react';
import styles from './PictureSlider.module.scss';

import slide1 from './images/slide-1.jpg';
import slide2 from './images/slide-2.jpg';
import slide3 from './images/slide-3.jpg';

const slides = [slide1, slide2, slide3];

export const PictureSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex(prevIndex =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1,
      );
    }, 7000);

    return () => resetTimeout();
  }, [currentIndex]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrev = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <div className={styles.slider}>
      <div className={styles.sliderWindow}>
        <button
          className={`${styles.arrow} ${styles.left}`}
          onClick={goToPrev}
        />
        <img
          src={slides[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className={styles.slideImage}
        />
        <button
          className={`${styles.arrow} ${styles.right}`}
          onClick={goToNext}
        />
      </div>
      <div className={styles.dots}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${
              currentIndex === index ? styles.active : ''
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};
