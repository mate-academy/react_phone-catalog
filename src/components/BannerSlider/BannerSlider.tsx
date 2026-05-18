import { useState, useEffect } from 'react';
import cn from 'classnames';
import styles from './BannerSlider.module.scss';

const BANNERS = [
  '/img/banner-phones.png',
  '/img/banner-tablets.png',
  '/img/banner-accessories.png',
];

export const BannerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = () => {
    setCurrentIndex(prev => (prev === BANNERS.length - 1 ? 0 : prev + 1));
  };

  const goPrev = () => {
    setCurrentIndex(prev => (prev === 0 ? BANNERS.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(goNext, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.banner}>
      <div className={styles.banner__container}>
        <button type="button" className={styles.banner__btn} onClick={goPrev}>
          <img src="/img/arrow-left.png" alt="Previous" />
        </button>

        <div className={styles.banner__window}>
          <div
            className={styles.banner__track}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {BANNERS.map((banner, index) => (
              <img
                key={banner}
                src={banner}
                alt={`Banner ${index}`}
                className={styles.banner__image}
              />
            ))}
          </div>
        </div>

        <button type="button" className={styles.banner__btn} onClick={goNext}>
          <img src="/img/arrow-right.png" alt="Next" />
        </button>
      </div>

      <div className={styles.banner__dots}>
        {BANNERS.map((_, index) => (
          <button
            type="button"
            key={index}
            aria-label={`Slide ${index}`}
            className={cn(styles.banner__dot, {
              [styles['banner__dot--active']]: currentIndex === index,
            })}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
