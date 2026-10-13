import { useState, useEffect } from 'react';
import cn from 'classnames';
import styles from './PicturesSlider.module.scss';

// Массив путей к картинкам (добавь свои баннеры в public/img/)
const banners = [
  'public/img/banner-accessories.png',
  'public/img/banner-phones.png',
  'public/img/banner-tablets.png',
];

export const PicturesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Автоматическая прокрутка каждые 5 секунд
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);

    // Очищаем таймер, если пользователь кликнул сам (чтобы сбросить отсчет)
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.sliderContainer}>
        <button
          className={styles.navButton}
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={styles.imageWrapper}>
          <div
            className={styles.imageTrack}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {banners.map((banner, index) => (
              <img
                key={index}
                src={banner}
                alt={`Banner ${index + 1}`}
                className={styles.image}
              />
            ))}
          </div>
        </div>

        <button
          className={styles.navButton}
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12L10 8L6 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className={styles.dots}>
        {banners.map((_, index) => (
          <button
            key={index}
            className={cn(styles.dot, {
              [styles.active]: index === currentIndex,
            })}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
