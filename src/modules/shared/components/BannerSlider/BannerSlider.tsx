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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

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
          setCurrentSlide(
            currentSlide === 0 ? slides.length - 1 : currentSlide - 1,
          );
        }

        if (diff > 50) {
          setCurrentSlide(
            currentSlide === slides.length - 1 ? 0 : currentSlide + 1,
          );
        }
      }}
    >
      <div className={styles.slider_content}>
        <button
          className={styles.icon}
          onClick={() =>
            setCurrentSlide(
              currentSlide === 0 ? slides.length - 1 : currentSlide - 1,
            )
          }
        >
          <img src="img/icons/Chevron_(Arrow_Left).svg" alt="" />
        </button>

        <div className={styles.images}>
          <img src={slides[currentSlide]} alt="banner" />
        </div>

        <button
          className={styles.icon}
          onClick={() =>
            setCurrentSlide(
              currentSlide === slides.length - 1 ? 0 : currentSlide + 1,
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
              onClick={() => setCurrentSlide(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
