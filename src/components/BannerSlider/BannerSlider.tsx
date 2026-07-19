import { useEffect, useRef, useState, type TouchEvent } from 'react';

import styles from './BannerSlider.module.scss';

const baseUrl = import.meta.env.BASE_URL;

type Banner = {
  src: string;
  mobileSrc?: string;
  alt: string;
};

const banners: Banner[] = [
  {
    src: `${baseUrl}img/banner-iphone-14.png`,
    mobileSrc: `${baseUrl}img/banner-iphone-16-mobile.png`,
    alt: 'iPhone banner',
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

const iconSrc = (iconName: string) => {
  return `${baseUrl}img/icons/${iconName}`;
};

const slideDuration = 5000;
const swipeThreshold = 50;

export const BannerSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex(currentIndex => {
        return (currentIndex + 1) % banners.length;
      });
    }, slideDuration);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const handlePrevClick = () => {
    setActiveIndex(currentIndex => {
      return currentIndex === 0 ? banners.length - 1 : currentIndex - 1;
    });
  };

  const handleNextClick = () => {
    setActiveIndex(currentIndex => {
      return currentIndex === banners.length - 1 ? 0 : currentIndex + 1;
    });
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) {
      return;
    }

    const touchEndX = event.changedTouches[0].clientX;
    const swipeDistance = touchEndX - touchStartX.current;

    if (swipeDistance > swipeThreshold) {
      handlePrevClick();
    } else if (swipeDistance < -swipeThreshold) {
      handleNextClick();
    }

    touchStartX.current = null;
  };

  const handleTouchCancel = () => {
    touchStartX.current = null;
  };

  const activeBanner = banners[activeIndex];

  return (
    <section className={styles.slider} aria-label="Main banner">
      <div
        className={styles.sliderRow}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
      >
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

        <picture className={styles.bannerPicture}>
          {activeBanner.mobileSrc && (
            <source
              media="(max-width: 639px)"
              srcSet={activeBanner.mobileSrc}
            />
          )}

          <img
            src={activeBanner.src}
            alt={activeBanner.alt}
            className={styles.banner}
          />
        </picture>

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
        {banners.map((banner, index) => (
          <button
            key={banner.src}
            type="button"
            className={
              index === activeIndex
                ? `${styles.dot} ${styles.dotActive}`
                : styles.dot
            }
            aria-label={`Show banner ${index + 1}`}
            aria-current={index === activeIndex ? 'true' : undefined}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};
