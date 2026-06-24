import classNames from 'classnames';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { imageUrl } from '../../../../utils/imageUrl';
import styles from './Preview.module.scss';
import { useTheme } from '../../../../hooks/useTheme';

export const Preview = () => {
  const images = [
    '/img/preview-1.jpg',
    '/img/preview-2.jpg',
    '/img/preview-3.jpg',
  ];
  const autoTimer = useRef<NodeJS.Timeout | null>(null);
  const manualTimeout = useRef<NodeJS.Timeout | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const sliderRef = useRef(null);
  const { theme } = useTheme();

  // auto slider
  const startAutoPlay = () => {
    if (autoTimer.current) {
      return;
    }

    autoTimer.current = setInterval(() => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      nextSlide();
    }, 5000);
  };

  const stopAutoPlay = () => {
    if (autoTimer.current) {
      clearInterval(autoTimer.current);
      autoTimer.current = null;
    }
  };

  const resetAutoPlay = () => {
    stopAutoPlay();

    if (manualTimeout.current) {
      clearTimeout(manualTimeout.current);
    }

    manualTimeout.current = setTimeout(() => {
      startAutoPlay();
    }, 5000);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    startAutoPlay();

    return () => {
      stopAutoPlay();
      if (manualTimeout.current) {
        clearTimeout(manualTimeout.current);
      }
    };
  }, []);

  // toggling slider by mouse
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.clientX);
    resetAutoPlay();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) {
      return;
    }

    const diff = startX - e.clientX;

    if (diff > 50) {
      setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
      setIsDragging(false);
    } else if (diff < -50) {
      setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // toggling slider by touching on mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.targetTouches[0].clientX);
    resetAutoPlay();
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    } else if (diff < -50) {
      setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  // toggling slider by arrows and buttons
  const nextSlide = () => {
    resetAutoPlay();

    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    resetAutoPlay();

    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const selectSlide = (selected: number) => {
    resetAutoPlay();

    setCurrentIndex(selected);
  };

  return (
    <div className={styles.preview}>
      <div className={styles.container}>
        <button
          style={{ transform: 'rotate(180deg)' }}
          type="button"
          className={classNames(styles.arrow, styles.arrow__left)}
          onClick={prevSlide}
        >
          <img
            src={
              theme === 'dark'
                ? imageUrl('icons/Arrow_white.svg')
                : imageUrl('icons/ArrowRight.svg')
            }
            alt=""
            className={styles.arrow__img}
          />
        </button>
        <div
          className={styles.slider}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          ref={sliderRef}
        >
          <div
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            className={styles.slider__track}
          >
            {images.map((item, index) => {
              return (
                <div className={styles.slider__slide} key={index}>
                  <img
                    draggable="false"
                    src={imageUrl(item)}
                    alt=""
                    className={styles.slider__img}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <button
          type="button"
          className={classNames(styles.arrow, styles.arrow__right)}
          onClick={nextSlide}
        >
          <img
            src={
              theme === 'dark'
                ? imageUrl('icons/Arrow_white.svg')
                : imageUrl('icons/ArrowRight.svg')
            }
            alt=""
            className={styles.arrow__img}
          />
        </button>
      </div>
      <div className={styles.pagination}>
        {images.map((_, index) => {
          return (
            <button
              key={index}
              type="button"
              onClick={() => selectSlide(index)}
              className={classNames(styles.pagination__btn, {
                [styles.pagination__btn_active]: index === currentIndex,
              })}
            ></button>
          );
        })}
      </div>
    </div>
  );
};
