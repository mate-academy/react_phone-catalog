import { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import {
  IconChevronLeft,
  IconChevronRight,
} from '../../../shared/components/Icons';
import styles from './PicturesSlider.module.scss';
import { assetUrl } from '../../../shared/utils';

interface Slide {
  src: string;
  alt: string;
}

const SLIDES: Slide[] = [
  { src: 'img/banner-phones.png', alt: 'Phones banner' },
  { src: 'img/banner-tablets.png', alt: 'Tablets banner' },
  { src: 'img/banner-accessories.png', alt: 'Accessories banner' },
];

export function PicturesSlider(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsInteracting(true);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % SLIDES.length);
    setIsInteracting(true);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + SLIDES.length) % SLIDES.length);
    setIsInteracting(true);
  }, []);

  useEffect(() => {
    if (isInteracting) {
      return;
    }

    const interval = setInterval(goToNext, 5000);

    return () => clearInterval(interval);
  }, [isInteracting, goToNext]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrev();
      }

      if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrev, goToNext]);

  return (
    <section className={styles.slider} role="region" aria-label="Banner slider">
      <div className={styles.track}>
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            className={classNames(styles.slide, {
              [styles.active]: index === currentIndex,
            })}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${SLIDES.length}`}
          >
            <img
              src={assetUrl(slide.src)}
              alt={slide.alt}
              className={styles.image}
            />
          </div>
        ))}
      </div>
      <div className={styles.controls}>
        <button
          className={styles.arrowButton}
          onClick={goToPrev}
          aria-label="Previous slide"
        >
          <IconChevronLeft />
        </button>
        <div
          className={styles.dots}
          role="tablist"
          aria-label="Slide indicators"
        >
          {SLIDES.map((_, index) => (
            <button
              key={index}
              className={classNames(styles.dot, {
                [styles.active]: index === currentIndex,
              })}
              onClick={() => goToSlide(index)}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <button
          className={styles.arrowButton}
          onClick={goToNext}
          aria-label="Next slide"
        >
          <IconChevronRight />
        </button>
      </div>
    </section>
  );
}
