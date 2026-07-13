import { useState } from 'react';

import styles from './BannerSlider.module.scss';

const baseUrl = import.meta.env.BASE_URL;

const banners = [
  {
    src: `${baseUrl}img/banner-iphone-14.png`,
    alt: 'iPhone 14 Pro banner',
  },
  {
    src: `${baseUrl}img/banner-phones.png`,
    alt: 'Phones banner',
  },
  {
    src: `${baseUrl}img/banner-tablets.png`,
    alt: 'Tablets banner',
  },
  {
    src: `${baseUrl}img/banner-accessories.png`,
    alt: 'Accessories banner',
  },
];

const iconSrc = (iconName: string) => `${baseUrl}img/icons/${iconName}`;

export const BannerSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevClick = () => {
    setActiveIndex(currentIndex =>
      currentIndex === 0 ? banners.length - 1 : currentIndex - 1,
    );
  };

  const handleNextClick = () => {
    setActiveIndex(currentIndex =>
      currentIndex === banners.length - 1 ? 0 : currentIndex + 1,
    );
  };

  const activeBanner = banners[activeIndex];

  return (
    <section className={styles.slider} aria-label="Main banner">
      <div className={styles.sliderRow}>
        <button
          type="button"
          className={styles.arrowButton}
          aria-label="Previous banner"
          onClick={handlePrevClick}
        >
          <img
            src={iconSrc('chevron-arrow-left.svg')}
            alt=""
            className={styles.arrowIcon}
          />
        </button>

        <img
          src={activeBanner.src}
          alt={activeBanner.alt}
          className={styles.banner}
        />

        <button
          type="button"
          className={styles.arrowButton}
          aria-label="Next banner"
          onClick={handleNextClick}
        >
          <img
            src={iconSrc('chevron-arrow-right.svg')}
            alt=""
            className={styles.arrowIcon}
          />
        </button>
      </div>

      <div className={styles.dots} aria-label="Banner navigation">
        {banners.map(({ alt }, index) => (
          <button
            key={alt}
            type="button"
            className={
              index === activeIndex
                ? `${styles.dot} ${styles.dotActive}`
                : styles.dot
            }
            aria-label={`Show banner ${index + 1}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};
