import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import styles from './PicturesSlider.module.scss';

const images = [
  `${import.meta.env.BASE_URL}img/banner-phones.png`,
  `${import.meta.env.BASE_URL}img/banner-tablets.png`,
  `${import.meta.env.BASE_URL}img/banner-accessories.png`,
];

export const PicturesSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // KROK 1: Definiujemy funkcje NA GÓRZE, żeby useEffect je "widział"
  const handleNext = () => {
    setCurrentSlide(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentSlide(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // KROK 2: Dopiero teraz używamy useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]); // Resetujemy timer przy każdej zmianie slajdu

  return (
    <div className={styles.slider}>
      <div className={styles.buttonsWrapper}>
        {/* Przycisk w LEWO */}
        <button className={styles.button} onClick={handlePrev}>
          <img
            src={`${import.meta.env.BASE_URL}img/icons/arrow-left.svg`}
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

        {/* Przycisk w PRAWO */}
        <button className={styles.button} onClick={handleNext}>
          <img
            src={`${import.meta.env.BASE_URL}img/icons/arrow-right.svg`}
            alt="Next slide"
          />
        </button>
      </div>

      {/* Pagination (Kropki) */}
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
