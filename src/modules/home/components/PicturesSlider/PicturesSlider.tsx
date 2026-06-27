import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './PicturesSlider.module.scss';
import { BANNERS, BANNERS_MOBILE } from '../../../../constants/constants';

export const PicturesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = BANNERS.length;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetAutoPlay = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % totalSlides);
    }, 5000);
  }, [totalSlides]);

  useEffect(() => {
    resetAutoPlay();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [resetAutoPlay]);

  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + totalSlides) % totalSlides);
    resetAutoPlay();
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % totalSlides);
    resetAutoPlay();
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    resetAutoPlay();
  };

  if (totalSlides === 0) {
    return null;
  }

  return (
    <div className={styles.sliderWrapper}>
      <div className={styles.sliderRow}>
        <button
          className={styles.arrow}
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          <img src="./img/icons/left.svg" alt="Arrow left" />
        </button>

        <div className={styles.slide}>
          <picture>
            <source
              media="(min-width: 768px)"
              srcSet={BANNERS[currentIndex].src}
            />

            <img
              src={BANNERS_MOBILE[currentIndex].src}
              alt={BANNERS[currentIndex].alt}
              className={styles.slideImage}
            />
          </picture>
        </div>

        <button
          className={styles.arrow}
          onClick={handleNext}
          aria-label="Next slide"
        >
          <img src="./img/icons/right.svg" alt="Arrow right" />
        </button>
      </div>

      <div className={styles.dots}>
        {BANNERS.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${currentIndex === index ? styles.dotActive : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
