import React, { useEffect, useState, useRef } from 'react';
import styles from './PicturesSlider.module.scss';
import { useNavigate } from 'react-router';

type Props = {
  slides: string[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
};

export const PictureSlider: React.FC<Props> = ({
  slides,
  autoSlide = true,
  autoSlideInterval = 5000,
}) => {
  const [curr, setCurr] = useState(0);
  const navigate = useNavigate();
  const touchStart = useRef<number | null>(null);

  const prev = () =>
    setCurr(currPrev => (currPrev === 0 ? slides.length - 1 : currPrev - 1));
  const next = () =>
    setCurr(currNext => (currNext === slides.length - 1 ? 0 : currNext + 1));
  const goToSlide = (index: number) => {
    setCurr(index);
  };

  useEffect(() => {
    if (!autoSlide || slides.length === 0) {
      return;
    }

    const slideInterval = setInterval(() => {
      setCurr(el => (el === slides.length - 1 ? 0 : el + 1));
    }, autoSlideInterval);

    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, slides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) {
      return;
    }

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart.current - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        next();
      } else {
        prev();
      }
    }

    touchStart.current = null;
  };

  return (
    <div className={styles.container}>
      {slides.length > 0 && (
        <>
          <div
            className={styles.slideContainer}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button
              onClick={prev}
              className={`${styles.navButton} ${styles.leftButton}`}
              aria-label="Previous slide"
            >
              &#10094;
            </button>

            <div className={styles.imageWrapper}>
              <button
                className={styles.orderButton}
                onClick={() => navigate('/cart')}
              >
                ORDER NOW
              </button>
              <img
                src={slides[curr]}
                alt={`Slide ${curr + 1}`}
                className={styles.slideImage}
              />
            </div>

            <button
              onClick={next}
              className={`${styles.navButton} ${styles.rightButton}`}
              aria-label="Next slide"
            >
              &#10095;
            </button>
          </div>
          <div className={styles.navDots}>
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${styles.navDot} ${curr === index ? styles.activeDot : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
