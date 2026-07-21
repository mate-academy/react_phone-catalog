import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './PicturesSlider.module.scss';
import { getAssetUrl } from '../../utils/getAssetUrl';

const images = [
  getAssetUrl('/img/banner-phones.png'),
  getAssetUrl('/img/banner-tablets.png'),
  getAssetUrl('/img/banner-accessories.png'),
];

export const PicturesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000);
  }, []);

  useEffect(() => {
    startTimer();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startTimer]);

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
    startTimer();
  };

  const goToNext = () => {
    goToIndex((currentIndex + 1) % images.length);
  };

  const goToPrev = () => {
    goToIndex((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <div className={styles.banner}>
      <div className={styles.container}>
        <button className={styles.btnLeft} onClick={goToPrev}>
          <img
            src={getAssetUrl('/img/button-right-default.png')}
            alt="Previous"
          />
        </button>
        <div className={styles.window}>
          <img
            src={images[currentIndex]}
            alt="banner"
            className={styles.image}
          />
        </div>
        <button className={styles.btnRight} onClick={goToNext}>
          <img src={getAssetUrl('/img/button-right-default.png')} alt="Next" />
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
            onClick={() => goToIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
