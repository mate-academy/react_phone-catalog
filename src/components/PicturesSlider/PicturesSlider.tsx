import React, { useState, useEffect } from 'react';
import { normalizePath } from '../../api/products';
import styles from './PicturesSlider.module.scss';

const BANNERS = [
  '/img/banner-phones.png',
  '/img/banner-tablets.png',
  '/img/banner-accessories.png',
];

export const PicturesSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? BANNERS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === BANNERS.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <section className={styles.picturesSlider}>
      <div className={styles.picturesSlider__content}>
        <button
          type="button"
          className={styles.picturesSlider__btn}
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          ‹
        </button>

        <div className={styles.picturesSlider__bannerContainer}>
          <div
            className={styles.picturesSlider__track}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {BANNERS.map((banner, index) => (
              <div key={banner} className={styles.picturesSlider__slide}>
                <img
                  src={normalizePath(banner)}
                  alt={`Banner ${index + 1}`}
                  className={styles.picturesSlider__image}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className={styles.picturesSlider__btn}
          onClick={handleNext}
          aria-label="Next slide"
        >
          ›
        </button>
      </div>

      <div className={styles.picturesSlider__pagination}>
        {BANNERS.map((banner, index) => (
          <button
            key={banner}
            type="button"
            className={`${styles.picturesSlider__dot} ${
              index === currentIndex
                ? styles['picturesSlider__dot--active']
                : ''
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
