import { useState, useRef } from 'react';
import { useInterval } from '../../../../hooks/useInterval';
import styles from './PicturesSlider.module.scss';

const slides = [
  {
    id: 1,
    image: '/img/banner-phones.png',
    alt: 'Banner 1',
  },
  {
    id: 2,
    image: '/img/banner-tablets.png',
    alt: 'Banner 2',
  },
  {
    id: 3,
    image: '/img/banner-accessories.png',
    alt: 'Banner 3',
  },
];

const AUTOPLAY_DELAY = 5000;

export const PicturesSlider = () => {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  // ✅ useRef inside the component
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const goTo = (index: number) => {
    setCurrent((index + total) % total);
  };

  const goPrev = () => goTo(current - 1);
  const goNext = () => goTo(current + 1);

  useInterval(goNext, AUTOPLAY_DELAY);

  // ✅ handlers inside the component — can access goPrev/goNext
  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    touchEndX.current = event.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) < 50) {
      return;
    }

    if (diff > 0) {
      goNext();
    } else {
      goPrev();
    }
  };

  return (
    <div className={styles.slider}>
      <button
        className={`${styles.arrow} ${styles.arrowPrev}`}
        onClick={goPrev}
        aria-label="Previous slide"
      >
        <img src="/img/icons/arrow-down.svg" alt="" aria-hidden="true" />
      </button>

      <div
        className={styles.track}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <ul
          className={styles.slides}
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map(slide => (
            <li key={slide.id} className={styles.slide}>
              <img
                src={slide.image}
                alt={slide.alt}
                className={styles.image}
                draggable={false}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        className={`${styles.arrow} ${styles.arrowNext}`}
        onClick={goNext}
        aria-label="Next slide"
      >
        <img src="/img/icons/arrow-down.svg" alt="" aria-hidden="true" />
      </button>

      <ul className={styles.dots} role="tablist" aria-label="Slide indicators">
        {slides.map((slide, index) => (
          <li key={slide.id} role="presentation">
            <button
              role="tab"
              aria-selected={index === current}
              aria-label={`Go to slide ${index + 1}`}
              className={`${styles.dot} ${index === current ? styles.dotActive : ''}`}
              onClick={() => goTo(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
