import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './PicturesSlider.module.scss';

const banners = [
  {
    id: 1,
    image: '/img/banner-phones.png',
    link: '/phones',
    alt: 'Mobile phones banner',
  },
  {
    id: 2,
    image: '/img/banner-tablets.png',
    link: '/tablets',
    alt: 'Tablets banner',
  },
  {
    id: 3,
    image: '/img/banner-accessories.png',
    link: '/accessories',
    alt: 'Accessories banner',
  },
];

export const PicturesSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev === banners.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev === 0 ? banners.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.mainWrapper}>
        <button
          type="button"
          onClick={prevSlide}
          className={styles.navButton}
          aria-label="Previous banner"
        >
          <i className="fas fa-chevron-left" />
        </button>

        <div className={styles.bannerViewport}>
          <div
            className={styles.bannerTrack}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {banners.map(banner => (
              <Link key={banner.id} to={banner.link} className={styles.slide}>
                <img
                  src={banner.image}
                  alt={banner.alt}
                  className={styles.bannerImage}
                />
              </Link>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={nextSlide}
          className={styles.navButton}
          aria-label="Next banner"
        >
          <i className="fas fa-chevron-right" />
        </button>
      </div>

      <div className={styles.pagination}>
        {banners.map((banner, index) => (
          <button
            key={banner.id}
            type="button"
            className={classNames(styles.dot, {
              [styles.active]: index === currentSlide,
            })}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
