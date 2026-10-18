import { useEffect, useState } from 'react';

import styles from './PicturesSlider.module.scss';

const slides = [
  {
    id: 1,
    image: '/img/banner-phones.png',
    alt: 'Discover our mobile phones',
  },
  {
    id: 2,
    image: '/img/banner-tablets.png',
    alt: 'Discover our tablets',
  },
  {
    id: 3,
    image: '/img/banner-accessories.png',
    alt: 'Discover our accessories',
  },
];

export const PicturesSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(current => (current + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrentSlide(current => (current - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentSlide(current => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className={styles.slider}>
      <div className={styles.content}>
        <button
          type="button"
          className={styles.arrow}
          onClick={previousSlide}
          aria-label="Previous slide"
        >
          ‹
        </button>

        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src={slides[currentSlide].image}
            alt={slides[currentSlide].alt}
          />
        </div>

        <button
          type="button"
          className={styles.arrow}
          onClick={nextSlide}
          aria-label="Next slide"
        >
          ›
        </button>
      </div>

      <div className={styles.dots}>
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={
              index === currentSlide
                ? `${styles.dot} ${styles.activeDot}`
                : styles.dot
            }
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  );
};
