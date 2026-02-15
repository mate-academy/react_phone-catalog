import { useEffect, useRef, useState } from 'react';
import styles from './BigCarousel.module.scss';
import {
  multiplePhones,
  tabletSlider,
  headphones,
} from '../../../assets/images';
import { Link } from 'react-router-dom';

export const BigCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [multiplePhones, tabletSlider, headphones];

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  };
  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  };
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    if (touchStartX.current === null || touchEndX.current === null) return;

    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const getRoute = (): string => {
    switch (images[currentIndex]) {
      case multiplePhones:
        return '/products/phones';
      case tabletSlider:
        return '/products/tablets';
      case headphones:
        return '/products/accessories';
      default:
        return '';
    }
  };

  return (
    <div className="container noMobilePaddings">
      <div className={styles.bigSlider}>
        <button
          className={`${styles.bigSlider__button} ${styles.bigSlider__button_prev}`}
          onClick={prevSlide}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: 'rotate(180deg)' }}
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.52876 3.52864C5.78911 3.26829 6.21122 3.26829 6.47157 3.52864L10.4716 7.52864C10.7319 7.78899 10.7319 8.2111 10.4716 8.47145L6.47157 12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841 12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00004L5.52876 4.47145C5.26841 4.2111 5.26841 3.78899 5.52876 3.52864Z"
              fill="currentColor"
            />
          </svg>
        </button>
        <div
          className={`${styles.bigSlider__slideContainer} ${styles.slideContainer}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className={styles.slideContainer__text}>
            <div>
              <div className={styles.slideContainer__title}>
                Now available in our store!
              </div>
              <div className={styles.slideContainer__description}>
                Be the first
              </div>
            </div>
            <Link to={getRoute()}>Order now</Link>
          </div>
          <div className={styles.slideContainer__img}>
            <img src={images[currentIndex]} alt={`slide ${currentIndex}`} />
          </div>
        </div>
        <button
          className={`${styles.bigSlider__button} ${styles.bigSlider__button_next}`}
          onClick={nextSlide}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.52876 3.52864C5.78911 3.26829 6.21122 3.26829 6.47157 3.52864L10.4716 7.52864C10.7319 7.78899 10.7319 8.2111 10.4716 8.47145L6.47157 12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841 12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00004L5.52876 4.47145C5.26841 4.2111 5.26841 3.78899 5.52876 3.52864Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
      <div className={styles.bigSlider__dashes}>
        {images.map((_, index) => (
          <div
            key={index}
            className={`${styles.bigSlider__dash} ${index === currentIndex ? styles.active : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};
