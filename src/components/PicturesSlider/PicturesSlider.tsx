import { useState, useEffect } from 'react';
import styles from './PicturesSlider.module.scss';

const images = [
  '/img/banner-phones.png',
  '/img/banner-tablets.png',
  '/img/banner-accessories.png',
];

export const PicturesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className={styles.banner}>
      <div className={styles.container}>
        <button className={styles.btnLeft} onClick={goToPrev}>
          <img src="/img/button-right-default.png" alt="Previous" />
        </button>
        <div className={styles.window}>
          <img
            src={images[currentIndex]}
            alt="banner"
            className={styles.image}
          />
        </div>
        <button className={styles.btnRight} onClick={goToNext}>
          <img src="/img/button-right-default.png" alt="Next" />
        </button>
      </div>
      <div className={styles.dots}>
        {images.map((image, index) => (
          <button
            key={image}
            className={
              index === currentIndex
                ? `${styles.dot} ${styles.dotActive}`
                : styles.dot
            }
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
