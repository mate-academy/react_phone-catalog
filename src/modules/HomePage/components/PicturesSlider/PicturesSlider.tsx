import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './PicturesSlider.module.scss';

const SLIDER_IMAGES = [
  {
    src: '/img/banner-phones.png',
    title: 'iPhone 14 Pro',
    subtitle: 'Pro. Beyond.',
    description: 'Now available in our store!',
    cta: 'ORDER NOW',
  },
  {
    src: '/img/banner-tablets.png',
    title: 'Tablets Collection',
    subtitle: 'Powerful. Portable.',
    description: 'Be the first!',
    cta: 'SHOP NOW',
  },
  {
    src: '/img/banner-accessories.png',
    title: 'Accessories',
    subtitle: 'Complete Your Setup.',
    description: 'New arrivals every week!',
    cta: 'DISCOVER',
  },
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
      <button
        className={styles.slider__button}
        onClick={goToPrev}
        aria-label="Previous slide"
        role="previous-button"
      >
        <img src="/img/icons/icon-left.png" alt="Previous" />
      </button>
      <div className={styles.slider__container}>
        {/* Slides */}
        <div className={styles.slider__slides}>
          {SLIDER_IMAGES.map((slide, index) => (
            <div
              key={slide.src}
              className={classNames(styles.slider__slide, {
                [styles.slider__slide_active]: index === currentSlide,
              })}
            >
              <img
                src={slide.src}
                alt={`Banner ${index + 1}`}
                className={styles.slider__image}
              />
            </div>
          ))}
        </div>
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
      <button
        className={styles.slider__button}
        onClick={goToNext}
        aria-label="Next slide"
        role="next-button"
      >
        <img src="/img/icons/icon-right.png" alt="Next" />
      </button>
    </div>
  );
};
