import React, { useEffect, useState } from 'react';
import styles from './PicturesSlider.module.scss';

const PICTURES = [
  'img/banner-phones.png',
  'img/banner-tablets.png',
  'img/banner-accessories.png',
];

const AUTOPLAY_DELAY = 5000;

export const PicturesSlider = () => {
  const [current, setCurrent] = useState(0);

  const showNext = () => {
    setCurrent(prev => (prev === PICTURES.length - 1 ? 0 : prev + 1));
  };

  const showPrev = () => {
    setCurrent(prev => (prev === 0 ? PICTURES.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timerId = setTimeout(showNext, AUTOPLAY_DELAY);

    return () => clearTimeout(timerId);
  }, [current]);

  return (
    <div className={styles.slider}>
      <div className={styles.main}>
        <button type="button" className={styles.arrow} onClick={showPrev}>
          <img src="icons/arrow-left-dark.svg" alt="Previous picture" />
        </button>

        <img
          src={PICTURES[current]}
          alt={`Banner ${current + 1}`}
          className={styles.picture}
        />

        <button type="button" className={styles.arrow} onClick={showNext}>
          <img src="icons/arrow-right-dark.svg" alt="Next picture" />
        </button>
      </div>

      <div className={styles.dots}>
        {PICTURES.map((picture, index) => (
          <button
            key={picture}
            type="button"
            aria-label={`Show picture ${index + 1}`}
            className={
              index === current
                ? `${styles.dot} ${styles.dotActive}`
                : styles.dot
            }
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
};
