import { TouchEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Icon } from '../../../shared/components/Icon';
import { SLIDES } from './slides';
import styles from './PicturesSlider.module.scss';

const AUTOPLAY_DELAY = 5000;
const SWIPE_THRESHOLD = 50;

export const PicturesSlider = () => {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const slidesCount = SLIDES.length;

  const goNext = useCallback(
    () => setIndex(current => (current + 1) % slidesCount),
    [slidesCount],
  );

  const goPrev = useCallback(
    () => setIndex(current => (current - 1 + slidesCount) % slidesCount),
    [slidesCount],
  );

  // every change of the slide (manual too) restarts the 5 seconds timer
  useEffect(() => {
    const timerId = window.setTimeout(goNext, AUTOPLAY_DELAY);

    return () => window.clearTimeout(timerId);
  }, [index, goNext]);

  const handleTouchStart = (event: TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: TouchEvent) => {
    if (touchStartX.current === null) {
      return;
    }

    const distance = event.changedTouches[0].clientX - touchStartX.current;

    touchStartX.current = null;

    if (Math.abs(distance) < SWIPE_THRESHOLD) {
      return;
    }

    if (distance < 0) {
      goNext();
    } else {
      goPrev();
    }
  };

  return (
    <section
      className={styles.slider}
      aria-roledescription="carousel"
      aria-label="Featured offers"
    >
      <button
        type="button"
        className={cn(styles.arrow, styles.prev)}
        aria-label="Previous slide"
        onClick={goPrev}
      >
        <Icon name="chevron-left" />
      </button>

      <div
        className={styles.viewport}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <ul
          className={styles.track}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {SLIDES.map((slide, slideIndex) => (
            <li
              key={slide.id}
              className={styles.slide}
              aria-roledescription="slide"
              aria-label={`${slideIndex + 1} of ${slidesCount}`}
              aria-hidden={slideIndex !== index}
            >
              <Link
                to={slide.to}
                className={styles.link}
                tabIndex={slideIndex === index ? 0 : -1}
              >
                <picture>
                  {slide.mobileImage && (
                    <source
                      media="(max-width: 639px)"
                      srcSet={slide.mobileImage}
                    />
                  )}
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className={styles.image}
                    draggable={false}
                  />
                </picture>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className={cn(styles.arrow, styles.next)}
        aria-label="Next slide"
        onClick={goNext}
      >
        <Icon name="chevron-right" />
      </button>

      <div className={styles.dashes}>
        {SLIDES.map((slide, slideIndex) => (
          <button
            key={slide.id}
            type="button"
            className={cn(styles.dash, {
              [styles.activeDash]: slideIndex === index,
            })}
            aria-label={`Go to slide ${slideIndex + 1}`}
            aria-current={slideIndex === index}
            onClick={() => setIndex(slideIndex)}
          />
        ))}
      </div>
    </section>
  );
};
