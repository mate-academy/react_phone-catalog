import { useEffect, useState, useRef } from 'react';
import { ArrowIcon } from '../../../../components/icons/Arrow';
import classNames from 'classnames';
import styles from './HeroBanner.module.scss';

export const HeroBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const slides = [
    {
      id: 1,
      desktop: '/img/HeroBanner.svg',
      mobile: '/img/banner_mobile.svg',
    },
    {
      id: 2,
      desktop: '/img/Header-banner-2.png',
      mobile: '/img/banner-2-mb.png',
    },
    {
      id: 3,
      desktop: '/img/Header-banner-3.png',
      mobile: '/img/banner-3-mb.png',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, slides.length]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? 2 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  return (
    <div className={`${styles.hero} ${styles.section}`}>
      <div className={styles.container}>
        <h1 className={styles.visuallyHidden}>Product Catalog</h1>
        <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>

        <div
          className={styles.content}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            className={`${styles.sliderButton} ${styles.left}`}
            aria-label="Previous slide"
            onClick={handlePrev}
          >
            <ArrowIcon direction="left" />
          </button>
          <div
            className={`${styles.banner} ${styles.bannerDesktop}`}
            style={{ backgroundImage: `url(${slides[currentIndex].desktop})` }}
          />
          <div
            className={`${styles.banner} ${styles.bannerMobile}`}
            style={{ backgroundImage: `url(${slides[currentIndex].mobile})` }}
          />
          <button
            className={`${styles.sliderButton} ${styles.right}`}
            aria-label="Next slide"
            onClick={handleNext}
          >
            <ArrowIcon direction="right" />
          </button>
        </div>

        <div className={styles.dots}>
          <span
            className={classNames(styles.dot, {
              [styles.active]: currentIndex === 0,
            })}
          />
          <span
            className={classNames(styles.dot, {
              [styles.active]: currentIndex === 1,
            })}
          />
          <span
            className={classNames(styles.dot, {
              [styles.active]: currentIndex === 2,
            })}
          />
        </div>
      </div>
    </div>
  );
};
