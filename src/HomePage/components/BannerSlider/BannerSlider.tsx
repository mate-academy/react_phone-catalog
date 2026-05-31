import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import classNames from 'classnames';
import styles from './BannerSlider.module.scss';

const base = import.meta.env.BASE_URL;

const banners = [
  {
    id: 1,
    image: `${base}img/banner-phones.png`,
    alt: 'New Phones',
    link: '/phones',
  },
  {
    id: 2,
    image: `${base}img/banner-tablets.png`,
    alt: 'Tablets',
    link: '/tablets',
  },
  {
    id: 3,
    image: `${base}img/banner-accessories.png`,
    alt: 'Accessories',
    link: '/accessories',
  },
];

export const BannerSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((index: number) => {
    setCurrent((index + banners.length) % banners.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo(current + 1);
    }, 5000);

    return () => clearInterval(timer);
  }, [current, goTo]);

  return (
    <section className={styles.slider}>
      <button
        className={classNames(styles.arrow, styles.arrowLeft)}
        onClick={() => goTo(current - 1)}
        aria-label="Previous banner"
      >
        <i className="fa-solid fa-chevron-left" />
      </button>

      <div className={styles.track}>
        {banners.map((banner, i) => (
          <a
            key={banner.id}
            href={banner.link}
            className={classNames(styles.slide, {
              [styles.slideActive]: i === current,
            })}
            tabIndex={i === current ? 0 : -1}
          >
            <img src={banner.image} alt={banner.alt} className={styles.image} />
          </a>
        ))}
      </div>

      <button
        className={classNames(styles.arrow, styles.arrowRight)}
        onClick={() => goTo(current + 1)}
        aria-label="Next banner"
      >
        <i className="fa-solid fa-chevron-right" />
      </button>

      <div className={styles.dots}>
        {banners.map((_, i) => (
          <button
            key={i}
            className={classNames(styles.dot, {
              [styles.dotActive]: i === current,
            })}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
