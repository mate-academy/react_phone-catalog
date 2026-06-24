import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import styles from './PicturesSlider.module.scss';

const images = [
  `${import.meta.env.BASE_URL}/img/banner-phones.png`,
  `${import.meta.env.BASE_URL}/img/banner-tablets.png`,
  `${import.meta.env.BASE_URL}/img/banner-accessories.png`,
];

export const PicturesSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchPosition, setTouchPosition] = useState<number | null>(null);

  const handleNext = () => {
    setCurrentSlide(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentSlide(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Obsługa gestów (Swipe)
  const handleTouchStart = (e: React.TouchEvent) => {
    const touchDown = e.touches[0].clientX;

    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    // Przesunięcie o min. 5px uznajemy za swipe
    if (diff > 5) {
      handleNext();
      setTouchPosition(null);
    }

    if (diff < -5) {
      handlePrev();
      setTouchPosition(null);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div
      className={styles.slider}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className={styles.buttonsWrapper}>
        <button className={styles.button} onClick={handlePrev}>
          <img
            src={`${import.meta.env.BASE_URL}/img/icons/arrow-left.svg`}
            alt="Previous slide"
          />
        </button>

        <div className={styles.imageContainer}>
          <img
            src={images[currentSlide]}
            alt="Banner"
            className={styles.image}
          />
        </div>

        <button className={styles.button} onClick={handleNext}>
          <img
            src={`${import.meta.env.BASE_URL}/img/icons/arrow-right.svg`}
            alt="Next slide"
          />
        </button>
      </div>

      <div className={styles.dots}>
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={cn(styles.dot, {
              [styles.active]: index === currentSlide,
            })}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Select slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
