import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './Banner.module.scss';

const images = [
  '/img/banner-desktop-1.jpg',
  '/img/banner-desktop-2.jpg',
  '/img/banner-desktop-3.jpg',
];

export const Banner: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () =>
    setIndex(prev => (prev - 1 + images.length) % images.length);
  const nextSlide = () => setIndex(prev => (prev + 1) % images.length);

  return (
    <div className={styles.banner}>
      <button className={styles.bannerButton} onClick={prevSlide}>
        <img
          className={styles.bannerArrow}
          src="/img/icons/arrow-left.svg"
          alt="arrow left"
        />
      </button>

      <div className={styles.bannerWrapper}>
        {images.map((img, i) => (
          <img
            key={img}
            src={img}
            alt="banner image"
            className={classNames(styles.bannerImage, {
              [styles.bannerImageActive]: i === index,
              [styles.bannerImageLast]: i === images.length - 1,
            })}
          />
        ))}
      </div>

      <button className={styles.bannerButton} onClick={nextSlide}>
        <img
          className={styles.bannerArrow}
          src="/img/icons/arrow-right.svg"
          alt="arrow right"
        />
      </button>

      <div className={styles.bannerDots}>
        {images.map((_, i) => (
          <span
            key={i}
            className={classNames(styles.bannerDot, {
              [styles.bannerDotActive]: i === index,
            })}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};
