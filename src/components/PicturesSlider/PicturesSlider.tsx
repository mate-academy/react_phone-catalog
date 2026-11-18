import { useEffect, useRef, useState } from 'react';
import type { TouchEvent } from 'react';
import styles from './PicturesSlider.module.scss';
import { getPublicUrl } from '../../utils/getPublicUrl';

const slides = [
  getPublicUrl('/img/banner-home.png'),
  getPublicUrl('/img/banner-phones.png'),
  getPublicUrl('/img/banner-tablets.png'),
  getPublicUrl('/img/banner-accessories.png'),
];

export const PicturesSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const nextSlide = () => {
    setCurrentSlide(current => (current + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(current =>
      current === 0 ? slides.length - 1 : current - 1,
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide(current => (current + 1) % slides.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentSlide]);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];

    if (!touch) {
      return;
    }

    touchStart.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;

    touchStart.current = null;

    const touch = event.changedTouches[0];

    if (!start || !touch) {
      return;
    }

    const diffX = touch.clientX - start.x;
    const diffY = touch.clientY - start.y;

    if (Math.abs(diffX) < 50 || Math.abs(diffX) <= Math.abs(diffY)) {
      return;
    }

    if (diffX < 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  };

  return (
    <section className={styles.slider}>
      <div
        className={styles.sliderRow}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => {
          touchStart.current = null;
        }}
      >
        <button
          className={styles.sliderButton}
          type="button"
          aria-label="Previous slide"
          onClick={prevSlide}
        >
          <img
            className={styles.chevron}
            src={getPublicUrl('/img/icon/chevron-left.svg')}
            alt=""
          />
        </button>

        <picture key={currentSlide} className={styles.bannerPicture}>
          {currentSlide === 0 && (
            <source
              media="(max-width: 639px)"
              srcSet={getPublicUrl('/img/banner-home-mobile.png')}
            />
          )}

          <img
            className={styles.banner}
            src={slides[currentSlide]}
            alt={`Promotional banner ${currentSlide + 1}`}
            draggable={false}
          />
        </picture>

        <button
          className={styles.sliderButton}
          type="button"
          aria-label="Next slide"
          onClick={nextSlide}
        >
          <img
            className={styles.chevron}
            src={getPublicUrl('/img/icon/chevron-right.svg')}
            alt=""
          />
        </button>
      </div>

      <div className={styles.dots}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${
              index === currentSlide ? styles.activeDot : ''
            }`}
            type="button"
            aria-label={`Show slide ${index + 1}`}
            aria-current={index === currentSlide ? 'true' : undefined}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};
