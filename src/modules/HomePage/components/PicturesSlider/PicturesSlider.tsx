import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './PicturesSlider.module.scss';

const SLIDER_IMAGES = [
  '/img/banner-phones.png',
  '/img/banner-tablets.png',
  '/img/banner-accessories.png',
];

const SLIDER_INTERVAL = 5000;

export const PicturesSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % SLIDER_IMAGES.length);
    }, SLIDER_INTERVAL);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), SLIDER_INTERVAL * 2);
  };

  const goToNext = () => {
    setCurrentSlide(prev => (prev + 1) % SLIDER_IMAGES.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), SLIDER_INTERVAL * 2);
  };

  const goToPrev = () => {
    setCurrentSlide(
      prev => (prev - 1 + SLIDER_IMAGES.length) % SLIDER_IMAGES.length,
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), SLIDER_INTERVAL * 2);
  };

  return (
    <div className={styles.slider}>
      <div className={styles.slider__container}>
        {/* Slides */}
        <div className={styles.slider__slides}>
          {SLIDER_IMAGES.map((image, index) => (
            <div
              key={image}
              className={classNames(styles.slider__slide, {
                [styles.slider__slide_active]: index === currentSlide,
              })}
            >
              <img
                src={image}
                alt={`Banner ${index + 1}`}
                className={styles.slider__image}
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          className={styles.slider__button}
          onClick={goToPrev}
          aria-label="Previous slide"
          role="previous-button"
        >
          <img src="/img/icons/icon-left.png" alt="Previous" />
        </button>

        <button
          className={styles.slider__button}
          onClick={goToNext}
          aria-label="Next slide"
          role="next-button"
        >
          <img src="/img/icons/icon-right.png" alt="Next" />
        </button>

        {/* Dots */}
        <div className={styles.slider__dots}>
          {SLIDER_IMAGES.map((_, index) => (
            <button
              key={index}
              className={classNames(styles.slider__dot, {
                [styles.slider__dot_active]: index === currentSlide,
              })}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
