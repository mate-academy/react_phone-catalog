import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './Swiper.module.scss';
import useMediaQuery from '@/useMediaQuery';
import LeftArrow from 'assets/icons/arrow-left.svg';
import RightArrow from 'assets/icons/arrow-right.svg';

const imagesIPhone = [
  '/img/banner-mob.png',
  '/img/banner-swiper.png',
  '/img/iphones.png',
];

const imagesTablet = [
  '/img/banner-desk.png',
  '/img/banner-phones.png',
  '/img/banner-swiper.png',
];

export const SliderSwiper: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isTabletOrDesktop = useMediaQuery({ minWidth: 641 });
  const changeInterval = 5000;

  const currentImages = isTabletOrDesktop ? imagesTablet : imagesIPhone;

  const resetInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setActiveIndex(prevIndex =>
        prevIndex === currentImages.length - 1 ? 0 : prevIndex + 1,
      );
    }, changeInterval);
  }, [changeInterval, currentImages.length]);

  const goToNext = useCallback(() => {
    setActiveIndex(prevIndex =>
      prevIndex === currentImages.length - 1 ? 0 : prevIndex + 1,
    );
    resetInterval();
  }, [currentImages.length, resetInterval]);

  const goToPrev = useCallback(() => {
    setActiveIndex(prevIndex =>
      prevIndex === 0 ? currentImages.length - 1 : prevIndex - 1,
    );
    resetInterval();
  }, [currentImages.length, resetInterval]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;
    const swipeThreshold = 50;

    if (deltaX > swipeThreshold) {
      goToPrev();
    } else if (deltaX < -swipeThreshold) {
      goToNext();
    }

    setTouchStartX(null);
  };

  useEffect(() => {
    resetInterval();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [resetInterval]);

  useEffect(() => {
    setActiveIndex(0);
  }, [isTabletOrDesktop]);

  return (
    <div className={styles.swiper}>
      <div className={styles.swiperContainer}>
        {isTabletOrDesktop && (
          <button
            className={`${styles.navButton} ${styles.navButtonLeft}`}
            onClick={goToPrev}
            aria-label="Previous slide"
          >
            <img src={LeftArrow} alt="left" className={styles.arrowIcon} />
          </button>
        )}

        <div
          className={styles.sliderContent}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={styles.sliderTrack}
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {currentImages.map((src, index) => (
              <div key={index} className={styles.slide}>
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className={styles.slideImage}
                />
              </div>
            ))}
          </div>
        </div>

        {isTabletOrDesktop && (
          <button
            className={`${styles.navButton} ${styles.navButtonRight}`}
            onClick={goToNext}
            aria-label="Next slide"
          >
            <img src={RightArrow} alt="right" className={styles.arrowIcon} />
          </button>
        )}
      </div>

      <div className={styles.pagination}>
        {currentImages.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveIndex(index);
              resetInterval();
            }}
            className={`${styles.paginationDot} ${
              index === activeIndex ? styles.paginationDotActive : ''
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
