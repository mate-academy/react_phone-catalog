import React, { useEffect, useState } from 'react';
import styles from './PicturesSlider.module.scss';

const images = [
  'img/banner-phones.png',
  'img/banner-tablets.png',
  'img/banner-accessories.png',
];

export const PicturesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className={styles.picturesSlider}>
      <div className={styles.container}>
        {/* Кнопка Влево */}
        <button className={styles.arrow} onClick={handlePrev}>
          <div className={styles.arrowIconLeft}></div>
        </button>

        {/* Окно просмотра */}
        <div className={styles.window}>
          {/* Лента, которая плавно двигается */}
          <div
            className={styles.tape}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Banner ${index + 1}`}
                className={styles.image}
              />
            ))}
          </div>
        </div>

        {/* Кнопка Вправо */}
        <button className={styles.arrow} onClick={handleNext}>
          <div className={styles.arrowIconRight}></div>
        </button>
      </div>

      {/* Точки пагинации */}
      <div className={styles.dots}>
        {images.map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
