import React, { useEffect, useState } from 'react';

import styles from './Hero.module.scss';
import classNames from 'classnames';
import { ArrowLeftIcon } from '../../../components/ui/ArrowLeftIcon';
import { ArrowRightIcon } from '../../../components/ui/ArrowRightIcon';
import { useSwipe } from '../../../hooks/useSwipe';

const banners = [
  '/img/banner-accessories.png',
  '/img/banner-phones.png',
  '/img/banner-tablets.png',
];

export const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleNextBanner = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % banners.length);
  };

  const handlePrevBanner = () => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + banners.length) % banners.length,
    );
  };

  useEffect(() => {
    const interval = setInterval(handleNextBanner, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const swipeHandlers = useSwipe({
    onSwipedLeft: handleNextBanner,
    onSwipedRight: handlePrevBanner,
  });

  return (
    <section className={styles.hero}>
      <div className={styles.hero__main}>
        <button
          className={classNames(
            styles.hero__button,
            styles['hero__button--prev'],
          )}
          onClick={handlePrevBanner}
          aria-label="Previous banner"
        >
          <ArrowLeftIcon />
        </button>
        <div className={styles.hero__viewport} {...swipeHandlers}>
          <div
            className={styles.hero__track}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {banners.map((banner, index) => (
              <img
                key={index}
                src={banner}
                alt={`Banner ${index + 1}`}
                className={styles.hero__image}
              />
            ))}
          </div>
        </div>
        <button
          className={classNames(
            styles.hero__button,
            styles['hero__button--next'],
          )}
          onClick={handleNextBanner}
          aria-label="Next slide"
        >
          <ArrowRightIcon />
        </button>
      </div>
      <div className={styles.hero__pagination}>
        {banners.map((_, index) => (
          <button
            key={index}
            className={classNames(styles.hero__dot, {
              [styles['hero__dot--active']]: index === currentIndex,
            })}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to banner ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
};
