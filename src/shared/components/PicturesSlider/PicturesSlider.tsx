import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './PicturesSlider.module.scss';

import bannerHome from '../../../assets/img/banner-home.png';
import bannerPhones from '../../../assets/img/banner-phones.png';
import bannerTablets from '../../../assets/img/banner-tablets.png';
import bannerAccessories from '../../../assets/img/banner-accessories.png';

import arrowLeftSlider from '../../../assets/icons/ChevronArrowLeftSlider.svg';
import arrowRightSlider from '../../../assets/icons/ChevronArrowRight.svg';

const images = [bannerHome, bannerPhones, bannerTablets, bannerAccessories];

export const PicturesSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrent(prev => (prev + 1) % images.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent(prev => (prev - 1 + images.length) % images.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    timerRef.current = setInterval(nextSlide, 5000);
  }, [stopTimer, nextSlide]);

  useEffect(() => {
    startTimer();

    return () => stopTimer();
  }, [startTimer, stopTimer]);

  return (
    <div className={styles.sliderSection}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
      </div>

      <div className={styles.sliderGrid}>
        <div className={styles.leftCol} onClick={prevSlide}>
          <img
            src={arrowLeftSlider}
            className={styles.arrowIcon}
            alt="ChevronArrowLeft"
          />
        </div>

        <div className={styles.sliderWrapper}>
          <div className={styles.sliderViewport}>
            <div
              className={styles.sliderTrack}
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className={styles.image}
                  alt={`Slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className={styles.dots}>
            {images.map((_, slideIndex) => (
              <span
                key={slideIndex}
                className={`${styles.dot} ${current === slideIndex ? styles.active : ''}`}
                onClick={() => goToSlide(slideIndex)}
              />
            ))}
          </div>
        </div>

        <div className={styles.rightCol} onClick={nextSlide}>
          <img
            className={styles.arrowIcon}
            src={arrowRightSlider}
            alt="ChevronArrowRight"
          />
        </div>
      </div>
    </div>
  );
};
