import { useEffect, useState } from 'react';
import { getImageUrl } from '../../constants';
import styles from './PicturesSlider.module.scss';

const SLIDES = [
  { image: 'img/banner-phones.png', label: 'Phones' },
  { image: 'img/banner-tablets.png', label: 'Tablets' },
  { image: 'img/banner-accessories.png', label: 'Accessories' },
];

const INTERVAL = 5000;

export const PicturesSlider = () => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length);
    }, INTERVAL);

    return () => clearInterval(timer);
  }, []);

  const goToPrev = () => {
    setCurrent(prev => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const goToNext = () => {
    setCurrent(prev => (prev + 1) % SLIDES.length);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.slider}>
        <button
          type="button"
          className={styles.sliderButton}
          aria-label="Previous slide"
          onClick={goToPrev}
        >
          ‹
        </button>

        <div className={styles.sliderContent}>
          <div
            className={styles.track}
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {SLIDES.map(slide => (
              <img
                key={slide.image}
                src={getImageUrl(slide.image)}
                alt={slide.label}
                className={styles.image}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          className={styles.sliderButton}
          aria-label="Next slide"
          onClick={goToNext}
        >
          ›
        </button>
      </div>

      <div className={styles.dots}>
        {SLIDES.map((slide, index) => (
          <button
            key={slide.image}
            type="button"
            className={`${styles.dot} ${
              index === current ? styles.dotActive : ''
            }`}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
};
