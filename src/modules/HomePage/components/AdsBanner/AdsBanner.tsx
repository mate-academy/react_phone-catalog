import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSwipeable } from 'react-swipeable';

import styles from './AdsBanner.module.scss';
import { ICON_PATHS } from '../../../../shared/constants/IconPaths';
import { useMediaQuery } from '../../../../shared/hooks/useMediaQuery';
import { BREAKPOINTS } from '../../../../shared/constants/Breakpoints';

const banners = [
  './img/home_ads/iphone_17_air_render.jpg',
  './img/home_ads/iPad_air.jpg',
  './img/home_ads/Apple_Intelligence.png',
];

export const AdsBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % banners.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev - 1 + banners.length) % banners.length);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: goToNext,
    onSwipedRight: goToPrevious,
    trackMouse: true,
  });

  const isDesktop = useMediaQuery(BREAKPOINTS.desktop);

  return (
    <>
      <div className={styles.adWrapper} {...(!isDesktop ? swipeHandlers : {})}>
        <img
          src={banners[currentIndex]}
          alt={`Banner ${currentIndex + 1}`}
          className={styles.adImage}
        />

        <button className={styles.arrowLeft} onClick={goToPrevious}>
          <img src={ICON_PATHS.arrowLeft} alt="Left Arrow" />
        </button>

        <button className={styles.arrowRight} onClick={goToNext}>
          <img src={ICON_PATHS.arrowRight} alt="Right Arrow" />
        </button>
      </div>

      <div className={styles.pagination}>
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={styles.pagination__button}
            aria-label={`Go to banner ${index + 1}`}
          >
            <img
              src={ICON_PATHS.minus}
              alt="pagination line"
              className={
                currentIndex === index ? styles.activeLine : styles.line
              }
            />
          </button>
        ))}
      </div>
    </>
  );
};
