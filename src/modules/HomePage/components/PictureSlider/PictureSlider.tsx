import React, { useState, useEffect } from 'react';
import styles from './PictureSlider.module.scss';

const PictureSlider: React.FC = () => {
  const pictures: string[] = [
    'img/banner-accessories.png',
    'img/banner-phones.png',
    'img/banner-tablets.png',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % pictures.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [pictures.length]);

  const goToNext = () => setCurrentIndex(prev => (prev + 1) % pictures.length);
  const goToPrev = () => setCurrentIndex(prev => (prev - 1 + pictures.length) % pictures.length);

  return (
    <div className={styles.sliderContainer}>
      {pictures.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Slide ${index + 1}`}
          className={`${styles.sliderImage} ${index === currentIndex ? styles.active : ''}`}
        />
      ))}

      <button className={`${styles.sliderButton} ${styles.prev}`} onClick={goToPrev}>
        &#10094;
      </button>
      <button className={`${styles.sliderButton} ${styles.next}`} onClick={goToNext}>
        &#10095;
      </button>

      <div className={styles.sliderDots}>
        {pictures.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`${styles.sliderDot} ${index === currentIndex ? styles.active : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PictureSlider;
