import { useEffect, useState } from 'react';
import styles from './PicturesSlider.module.scss';

interface PicturesSliderProps {
  images: string[];
}

export const PicturesSlider = ({ images }: PicturesSliderProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length < 2) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [images.length]);

  const goTo = (index: number) => {
    const length = images.length;

    setCurrent(((index % length) + length) % length);
  };

  const handleNext = () => {
    goTo(current + 1);
  };

  const handlePrevious = () => {
    goTo(current - 1);
  };

  return (
    <div className={styles.slider}>
      <div
        className={styles.track}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((_, index) => (
          <div key={index} className={styles.slide}>
            <img src={images[index]} alt="" />
          </div>
        ))}
      </div>
      <button
        type="button"
        className={styles.arrow}
        onClick={handlePrevious}
        aria-label="Previous picture"
      >
        <i className="fas fa-chevron-left" />
      </button>
      <button
        type="button"
        className={styles.arrowNext}
        onClick={handleNext}
        aria-label="Next picture"
      >
        <i className="fas fa-chevron-right" />
      </button>
      <div className={styles.dots}>
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`${styles.dot} ${index === current ? styles.active : ''}`}
            onClick={() => goTo(index)}
            aria-label={`Go to picture ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
