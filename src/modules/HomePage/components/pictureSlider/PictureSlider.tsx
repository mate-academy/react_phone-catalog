import React, { useState, useEffect } from 'react';
import styles from './PictureSlider.module.scss';

export const PictureSlider: React.FC<{ banners?: string[] }> = ({
  banners = [],
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (banners.length === 0) {
      return;
    }

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % banners.length);
        setIsTransitioning(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const goToPrev = () => {
    if (banners.length === 0) {
      return;
    }

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(
        prevIndex => (prevIndex - 1 + banners.length) % banners.length,
      );
      setIsTransitioning(false);
    }, 500);
  };

  const goToNext = () => {
    if (banners.length === 0) {
      return;
    }

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % banners.length);
      setIsTransitioning(false);
    }, 500);
  };

  if (!banners || banners.length === 0) {
    return <div className={styles.slider}>No banners available</div>;
  }

  return (
    <div className={styles.slider}>
      <div className={styles.slideContainer}>
        <button
          className={styles.prev}
          onClick={goToPrev}
          aria-label="Previous"
        >
          {/* &lt; */}
        </button>
        <div className={styles.slide}>
          <img
            src={`./${banners[currentIndex]}`}
            alt={`Banner ${currentIndex + 1}`}
            className={`${styles.slideImage} ${isTransitioning ? styles.transition : ''}`}
          />
        </div>
        <button className={styles.next} onClick={goToNext} aria-label="Next">
          {/* &gt; */}
        </button>
      </div>

      <div className={styles.dots}>
        {banners.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentIndex(index);
                setIsTransitioning(false);
              }, 500);
            }}
          />
        ))}
      </div>
    </div>
  );
};
