import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './PicturesSlider.module.scss';

import { getAssetUrl } from '../../utils/helpers';

interface Slide {
  image: string;
  link: string;
  alt: string;
}

const SLIDES: Slide[] = [
  {
    image: 'img/banner-phones.png',
    link: '/phones',
    alt: 'Phones Category Banner',
  },
  {
    image: 'img/banner-tablets.png',
    link: '/tablets',
    alt: 'Tablets Category Banner',
  },
  {
    image: 'img/banner-accessories.png',
    link: '/accessories',
    alt: 'Accessories Category Banner',
  },
];

export const PicturesSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const stopTimer = React.useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = React.useCallback(() => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % SLIDES.length);
    }, 5000);
  }, [stopTimer]);

  useEffect(() => {
    startTimer();

    return () => stopTimer();
  }, [startTimer, stopTimer]);

  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + SLIDES.length) % SLIDES.length);
    startTimer();
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % SLIDES.length);
    startTimer();
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    startTimer();
  };

  return (
    <div className={styles.container} data-testid="pictures-slider">
      <div className={styles.mainRow}>
        <button
          type="button"
          className={styles.btn}
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          <i className="fa-solid fa-chevron-left" />
        </button>

        <div className={styles.viewport}>
          <div
            className={styles.track}
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {SLIDES.map((slide, index) => (
              <Link
                key={index}
                to={slide.link}
                className={styles.slide}
                aria-label={`Go to ${slide.alt}`}
              >
                <img src={getAssetUrl(slide.image)} alt={slide.alt} />
              </Link>
            ))}
          </div>
        </div>

        <button
          type="button"
          className={styles.btn}
          onClick={handleNext}
          aria-label="Next slide"
        >
          <i className="fa-solid fa-chevron-right" />
        </button>
      </div>

      <div className={styles.dots}>
        {SLIDES.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Jump to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
