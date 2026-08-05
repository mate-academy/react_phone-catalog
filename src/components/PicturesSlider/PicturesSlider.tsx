import { useEffect, useState } from 'react';

import styles from './PicturesSlider.module.scss';

const BASE_URL = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const IMAGE_PATH = `${BASE_URL}img`;

const slides = [
  {
    id: 1,
    image: `${IMAGE_PATH}/banner-phones.png`,
    alt: 'Phones banner',
  },
  {
    id: 2,
    image: `${IMAGE_PATH}/banner-tablets.png`,
    alt: 'Tablets banner',
  },
  {
    id: 3,
    image: `${IMAGE_PATH}/banner-accessories.png`,
    alt: 'Accessories banner',
  },
];

const SLIDE_INTERVAL = 5000;

export const PicturesSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const showPreviousSlide = () => {
    setCurrentSlide(current => {
      return current === 0 ? slides.length - 1 : current - 1;
    });
  };

  const showNextSlide = () => {
    setCurrentSlide(current => {
      return current === slides.length - 1 ? 0 : current + 1;
    });
  };

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentSlide(current => {
        return current === slides.length - 1 ? 0 : current + 1;
      });
    }, SLIDE_INTERVAL);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <section className={styles.slider} aria-label="Promotional banners">
      <div className={styles.content}>
        <button
          type="button"
          className={styles.arrowButton}
          onClick={showPreviousSlide}
          aria-label="Previous banner"
        >
          <span aria-hidden="true">‹</span>
        </button>

        <div className={styles.viewport}>
          <div
            className={styles.track}
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {slides.map(slide => (
              <div key={slide.id} className={styles.slide}>
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className={styles.image}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className={styles.arrowButton}
          onClick={showNextSlide}
          aria-label="Next banner"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <div className={styles.dots}>
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={
              index === currentSlide
                ? `${styles.dot} ${styles.dotActive}`
                : styles.dot
            }
            onClick={() => {
              setCurrentSlide(index);
            }}
            aria-label={`Show banner ${index + 1}`}
            aria-current={index === currentSlide ? 'true' : undefined}
          />
        ))}
      </div>
    </section>
  );
};
