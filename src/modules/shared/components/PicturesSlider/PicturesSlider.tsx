import React, { useCallback, useEffect, useState } from 'react';
import styles from './PicturesSlider.module.scss';

const BANNERS = [
  {
    id: 1,
    desktopImg: `${import.meta.env.BASE_URL}img/banner-phones.png`,
    mobileImg: `${import.meta.env.BASE_URL}img/banner-phones-mobile.png`,
    alt: 'iPhone 14 Pro available in our store',
  },
  {
    id: 2,
    desktopImg: `${import.meta.env.BASE_URL}img/banner-tablets.png`,
    mobileImg: `${import.meta.env.BASE_URL}img/banner-tablets.png`,
    alt: 'Tablets collection',
  },
  {
    id: 3,
    desktopImg: `${import.meta.env.BASE_URL}img/banner-accessories.png`,
    mobileImg: `${import.meta.env.BASE_URL}img/banner-accessories.png`,
    alt: 'Accessories collection',
  },
];

export const PicturesSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [handleNext, currentIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  return (
    <div className={styles.slider}>
      <div className={styles.slider__top}>
        <button
          type="button"
          className={styles.slider__arrow}
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          ‹
        </button>

        <div
          className={styles.slider__viewport}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={styles.slider__track}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {BANNERS.map((banner) => (
              <div key={banner.id} className={styles.slider__slide}>
                <picture>
                  <source
                    media="(max-width: 639px)"
                    srcSet={banner.mobileImg}
                  />
                  <img
                    src={banner.desktopImg}
                    alt={banner.alt}
                    className={styles.slider__image}
                  />
                </picture>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className={styles.slider__arrow}
          onClick={handleNext}
          aria-label="Next slide"
        >
          ›
        </button>
      </div>

      <div className={styles.slider__dots}>
        {BANNERS.map((banner, index) => (
          <button
            key={banner.id}
            type="button"
            onClick={() => setCurrentIndex(index)}
            className={`${styles.slider__dot} ${
              index === currentIndex ? styles['slider__dot--active'] : ''
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
