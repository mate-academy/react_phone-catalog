import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './BannerSlider.module.scss';
import { ArrowUpIcon } from '../../../shared/components/Icons';

interface Props {
  banners: { img: string; link: string; alt: string }[];
}

export const BannerSlider: React.FC<Props> = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % banners.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    if (banners.length === 0) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

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
          {banners.map(banner => (
            <Link key={banner.img} to={banner.link} className={styles.slide}>
              <img
                src={`${import.meta.env.BASE_URL}${banner.img}`}
                alt={banner.alt}
                className={styles.image}
              />
            </Link>
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
        {banners.map((_, index) => (
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
