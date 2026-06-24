import { useEffect, useState } from 'react';

import styles from './PicturesSlider.module.scss';

const BASE = import.meta.env.BASE_URL;

const SLIDES = [
  {
    src: `${BASE}img/banners/Banner.png`,
    mobileSrc: `${BASE}img/banners/Banner-mobile.png`,
    alt: 'iPhone 14 Pro banner',
  },
  { src: `${BASE}img/banners/slide-2.png`, alt: 'New tablets' },
  { src: `${BASE}img/banners/slide-3.png`, alt: 'New accessories' },
];

const PREV_PATH = 'M11 2L5 8l6 6';
const NEXT_PATH = 'M5 2l6 6-6 6';

export const PicturesSlider = () => {
  const [index, setIndex] = useState(0);
  const count = SLIDES.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % count);
    }, 5000);

    return () => clearInterval(timer);
  }, [count]);

  const prev = () => setIndex(i => (i - 1 + count) % count);
  const next = () => setIndex(i => (i + 1) % count);

  return (
    <div className={styles.slider}>
      <div className={styles.content}>
        <button
          type="button"
          className={styles.prevBtn}
          aria-label="Previous slide"
          onClick={prev}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d={PREV_PATH}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={styles.viewport}>
          <div
            className={styles.track}
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {SLIDES.map(slide => (
              <div key={slide.src} className={styles.slide}>
                <picture className={styles.picture}>
                  {slide.mobileSrc && (
                    <source
                      media="(max-width: 639px)"
                      srcSet={slide.mobileSrc}
                    />
                  )}
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className={styles.image}
                  />
                </picture>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className={styles.nextBtn}
          aria-label="Next slide"
          onClick={next}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d={NEXT_PATH}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className={styles.dots} role="tablist" aria-label="Slides">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Slide ${i + 1}`}
            className={
              i === index ? `${styles.dot} ${styles.dotActive}` : styles.dot
            }
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};
