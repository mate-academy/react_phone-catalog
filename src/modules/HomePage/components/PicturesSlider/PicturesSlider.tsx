import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ICONS } from '../../../../constants';
import styles from './PicturesSlider.module.scss';

type Slide = {
  id: number;
  image: string;
  alt: string;
};

type Props = {
  slides: Slide[];
};

const AUTOPLAY_DELAY = 5000;
const SWIPE_THRESHOLD = 10;

export const PicturesSlider = ({ slides }: Props) => {
  const [current, setCurrent] = useState(0);
  const [timerResetKey, setTimerResetKey] = useState(0);
  const total = slides.length;
  const touchStartX = useRef<number>(0); // only need start, end computed in handler
  const autoplayTimer = useRef<number | null>(null);

  const clearAutoplayTimer = useCallback(() => {
    if (autoplayTimer.current !== null) {
      window.clearTimeout(autoplayTimer.current);
      autoplayTimer.current = null;
    }
  }, []);

  const resetAutoplayTimer = useCallback(() => {
    clearAutoplayTimer();
    setTimerResetKey(key => key + 1);
  }, [clearAutoplayTimer]);

  const goTo = useCallback(
    (index: number, shouldResetTimer = true) => {
      if (shouldResetTimer) {
        resetAutoplayTimer();
      }

      setCurrent((index + total) % total);
    },
    [resetAutoplayTimer, total],
  );

  const goPrev = () => goTo(current - 1);
  const goNext = () => goTo(current + 1);

  useEffect(() => {
    if (total <= 1) {
      return clearAutoplayTimer;
    }

    autoplayTimer.current = window.setTimeout(() => {
      setCurrent(prev => (prev + 1) % total);
    }, AUTOPLAY_DELAY);

    return clearAutoplayTimer;
  }, [clearAutoplayTimer, current, timerResetKey, total]);

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const diff = touchStartX.current - event.changedTouches[0].clientX;

    if (Math.abs(diff) < SWIPE_THRESHOLD) {
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
      {/* Row: prev arrow + track + next arrow */}
      <div
        className={styles.main}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          className={`${styles.arrow} ${styles.arrowPrev}`}
          onClick={goPrev}
          aria-label="Previous slide"
        >
          <img src={ICONS.ARROW_DOWN} alt="" aria-hidden="true" />
        </button>

        <div className={styles.track}>
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
          <img src={ICONS.ARROW_DOWN} alt="" aria-hidden="true" />
        </button>
      </div>

      {/* Dots below — never overlapping image */}
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
