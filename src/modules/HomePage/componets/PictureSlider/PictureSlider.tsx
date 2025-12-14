import { useEffect, useRef, useState } from 'react';
import styles from './PictureSlider.module.scss';

const images = [
  'img/BannerForSlider.png',
  'img/Orange_backgroun.jpg',
  'img/green_background.jpg',
];

export const PictureSlider = () => {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const resetInterval = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      setIndex(prev => (prev + 1) % images.length);
    }, 5000);
  };

  const goTo = (i: number) => {
    setIndex(i);
    resetInterval();
  };

  const nextSlide = () => {
    setIndex(prev => (prev + 1) % images.length);
    resetInterval();
  };

  const prevSlide = () => {
    setIndex(prev => (prev - 1 + images.length) % images.length);
    resetInterval();
  };

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setIndex(prev => (prev + 1) % images.length);
    }, 5000);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.slider}>
      <div className={styles.slider_top}>
        <div
          onClick={prevSlide}
          className={`${styles.button} ${styles.button__left}`}
        ></div>

        <div className={styles.img__container}>
          <img src={images[index]} alt="slide" className={styles.img} />
        </div>

        <div
          onClick={nextSlide}
          className={`${styles.button} ${styles.button__right}`}
        ></div>
      </div>

      <div className={styles.dots__container}>
        {images.map((_, i) => (
          <span
            key={i}
            onClick={() => goTo(i)}
            className={index === i ? styles.dots__active : styles.dots}
          />
        ))}
      </div>
    </div>
  );
};
