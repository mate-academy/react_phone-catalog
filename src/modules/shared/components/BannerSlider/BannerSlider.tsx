import React, { useEffect, useState } from 'react';
import styles from './BannerSlider.module.scss';
import { BannerSliderLoading } from './Loading/BannerSliderLoading';

export const BannerSlider = ({ isLoading }: { isLoading: boolean }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    'img/banner-phones.png',
    'img/banner-tablets.png',
    'img/banner-accessories.png',
  ];
  const [prevSlide, setPrevSlide] = useState<number | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const goToSlide = (index: number, dir: 'next' | 'prev' = 'next') => {
    setDirection(dir);
    setPrevSlide(currentSlide);
    setCurrentSlide(index);
  };

  const getImageClass = (index: number) => {
    if (index === currentSlide) {
      return styles.active;
    }

    if (index === prevSlide) {
      return direction === 'next' ? styles.prevNext : styles.prevPrev;
    }

    return '';
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToSlide(
        currentSlide === slides.length - 1 ? 0 : currentSlide + 1,
        'next',
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, slides.length]);

  const [touchStartX, setTouchStartX] = useState(0);

  return isLoading ? (
    <BannerSliderLoading />
  ) : (
    <div
      className={styles.bannerSlider}
      onTouchStart={event => setTouchStartX(event.touches[0].clientX)}
      onTouchEnd={event => {
        const diff = touchStartX - event.changedTouches[0].clientX;

        if (diff < -50) {
          goToSlide(
            currentSlide === 0 ? slides.length - 1 : currentSlide - 1,
            'prev',
          );
        }

        if (diff > 50) {
          goToSlide(
            currentSlide === slides.length - 1 ? 0 : currentSlide + 1,
            'next',
          );
        }
      }}
    >
      <div className={styles.slider_content}>
        <button
          className={styles.icon}
          onClick={() =>
            goToSlide(
              currentSlide === 0 ? slides.length - 1 : currentSlide - 1,
              'prev',
            )
          }
        >
          <img src="img/icons/Chevron_(Arrow_Left).svg" alt="" />
        </button>

        <div className={styles.images}>
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide}
              alt="banner"
              className={getImageClass(index)}
            />
          ))}
        </div>

        <button
          className={styles.icon}
          onClick={() =>
            goToSlide(
              currentSlide === slides.length - 1 ? 0 : currentSlide + 1,
              'next',
            )
          }
        >
          <img src="img/icons/Chevron_(Arrow_Right).svg" alt="next" />
        </button>
      </div>

      <div className={styles.buttons}>
        {slides.map((_, index) => (
          <div key={index} className={styles.button}>
            <button
              className={index === currentSlide ? styles.active : ''}
              onClick={() => goToSlide(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
