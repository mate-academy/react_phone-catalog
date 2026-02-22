import React, { useState, useEffect, useCallback } from 'react';
import styles from './PicturesSlider.module.scss';

const images = [
  { src: '/img/banner-phones.png', alt: 'Phones Banner' },
  { src: '/img/banner-tablets.png', alt: 'Tablets Banner' },
  { src: '/img/banner-accessories.png', alt: 'Accessories Banner' },
];

export const PicturesSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  }, []);

  const goToPrev = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 5000);

    return () => clearInterval(interval);
  }, [goToNext]);

  return (
    <div className={styles.slider}>
      <div className={styles.wrapper}>
        <button type="button" className={styles.button} onClick={goToPrev}>
          <img src="/img/icons/arrow-left.svg" alt="Previous" />
        </button>

        <div className={styles.imageContainer}>
          <div
            className={styles.track}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map(image => (
              <div key={image.alt} className={styles.slide}>
                <img src={image.src} alt={image.alt} />
              </div>
            ))}
          </div>
        </div>

        <button type="button" className={styles.button} onClick={goToNext}>
          <img src="/img/icons/arrow-right.svg" alt="Next" />
        </button>
      </div>

      <div className={styles.dots}>
        {images.map((image, index) => (
          <button
            key={image.alt}
            type="button"
            className={index === currentIndex ? styles.dotActive : styles.dot}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
