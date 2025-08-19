import { useState, useEffect, useRef } from 'react';

import arrowLeft from '../../../../assets/icons/arrow/left.svg';
import arrowRight from '../../../../assets/icons/arrow/right.svg';

import banner1 from '../../../../assets/images/slider/Banner.jpg';
import bannerMobile from '../../../../assets/images/slider/BannerMobile.jpg';
import banner2 from '../../../../assets/images/slider/phones.png';
import banner2Mobile from '../../../../assets/images/slider/phonesMobile.png';
import banner3 from '../../../../assets/images/slider/tablets.png';
import banner3Mobile from '../../../../assets/images/slider/tabletsMobile.png';
import styles from './BannerSlider.module.scss';

const slides = [
  { desktop: banner1, mobile: bannerMobile },
  { desktop: banner2, mobile: banner2Mobile },
  { desktop: banner3, mobile: banner3Mobile },
];

export const BannerSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleArrowSlideChange = (direction: 'left' | 'right') => {
    setActiveIndex(prev =>
      direction === 'left'
        ? (prev - 1 + slides.length) % slides.length
        : (prev + 1) % slides.length,
    );
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) {
      return;
    }

    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleArrowSlideChange('right');
      } else {
        handleArrowSlideChange('left');
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className={styles.slider}>
      <div className={styles.content}>
        <button
          className={styles.arrowLeft}
          onClick={() => handleArrowSlideChange('left')}
        >
          <img src={arrowLeft} alt="arrow left" />
        </button>

        <div
          className={styles.slides}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <picture>
            <source
              media="(max-width: 639px)"
              srcSet={slides[activeIndex].mobile}
            />
            <img
              src={slides[activeIndex].desktop}
              alt={`slide ${activeIndex + 1}`}
            />
          </picture>
        </div>

        <button
          className={styles.arrowRight}
          onClick={() => handleArrowSlideChange('right')}
        >
          <img src={arrowRight} alt="arrow right" />
        </button>
      </div>

      <div className={styles.dots}>
        {slides.map((_, index) => (
          <div key={index} className={styles.dot_container}>
            <span
              className={`${styles.dot} ${
                index === activeIndex ? styles.activeDot : ''
              }`}
              onClick={() => handleDotClick(index)}
            ></span>
          </div>
        ))}
      </div>
    </div>
  );
};
