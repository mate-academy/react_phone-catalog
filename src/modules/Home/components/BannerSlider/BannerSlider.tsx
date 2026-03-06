import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './BannerSlider.module.scss';
import { ArrowUpIcon } from '../../../shared/components/Icons';

const BANNERS = [
  { id: 1, img: '/img/banner-phones.png', link: '/phones' },
  { id: 2, img: '/img/banner-tablets.png', link: '/tablets' },
  { id: 3, img: '/img/banner-accessories.png', link: '/accessories' },
];

export const BannerSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % BANNERS.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + BANNERS.length) % BANNERS.length);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.slider}>
      <button
        className={classNames(styles.button, styles.buttonPrev)}
        onClick={handlePrev}
      >
        <ArrowUpIcon className={styles.icon} />
      </button>

      <div className={styles.window}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {BANNERS.map(banner => (
            <div key={banner.id} className={styles.slide}>
              <img
                src={banner.img}
                alt={`Banner ${banner.id}`}
                className={styles.image}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        className={classNames(styles.button, styles.buttonNext)}
        onClick={handleNext}
      >
        <ArrowUpIcon className={styles.icon} />
      </button>

      <div className={styles.dots}>
        {BANNERS.map((_, index) => (
          <button
            key={index}
            className={classNames(styles.dot, {
              [styles.dotActive]: index === currentIndex,
            })}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
