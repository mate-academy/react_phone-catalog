import { useState, useEffect } from 'react';
import styles from './Banner.module.scss';

const banners = [
  {
    id: 1,
    mobile: '/img/banner-phones-mobile.webp',
    tablet: '/img/banner-phones-tablet.webp',
    desktop: '/img/banner-phones-desktop.webp',
  },
  {
    id: 2,
    mobile: '/img/banner-tablets-mobile.webp',
    tablet: '/img/banner-tablets-tablet.webp',
    desktop: '/img/banner-tablets-desktop.webp',
  },
  {
    id: 3,
    mobile: '/img/banner-accessories-mobile.webp',
    tablet: '/img/banner-accessories-tablet.webp',
    desktop: '/img/banner-accessories-desktop.webp',
  },
];

export const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handlePrev = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1,
    );
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentIndex(prevIndex =>
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);

    return () => clearInterval(timerId);
  }, [currentIndex]);

  return (
    <div className={styles.banner}>
      <div className={styles.banner__top}>
        <button className={styles.banner__button} onClick={handlePrev}>
          <img src="/icons/arrow-left.svg" alt="Previous slide" />
        </button>

        <div className={styles.banner__imageContainer}>
          <picture>
            <source
              media="(min-width: 1200px)"
              srcSet={banners[currentIndex].desktop}
            />

            <source
              media="(min-width: 640px)"
              srcSet={banners[currentIndex].tablet}
            />

            <img
              src={banners[currentIndex].mobile}
              alt={`Banner ${currentIndex + 1}`}
              className={styles.banner__image}
            />
          </picture>
        </div>

        <button
          className={`${styles.banner__button} ${styles['banner__button--next']}`}
          onClick={handleNext}
        >
          <img src="/icons/arrow-right.svg" alt="Next slide" />
        </button>
      </div>

      <div className={styles.banner__dots}>
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`${styles.banner__dot} ${
              index === currentIndex ? styles['banner__dot--active'] : ''
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
