import styles from './PicturesSlider.module.scss';
import React, { useCallback, useEffect, useRef, useState } from 'react';

export const PicturesSlider = () => {
  const imagesMobile = [
    './img/mobile-banner-phones.png',
    './img/mobile-banner-accessories.png',
    './img/mobile-banner-tablets.png',
  ];
  const imagesDesktop = [
    './img/banner-phones.png',
    './img/banner-accessories.png',
    './img/banner-tablets.png',
  ];
  const isMobile = window.innerWidth < 640;
  const images = isMobile ? imagesMobile : imagesDesktop;
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);

  const handleLeftClick = useCallback(() => {
    setIndex(prev => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleRightClick = useCallback(() => {
    setIndex(prev => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const intervalId = setInterval(handleRightClick, 5000);

    return () => clearInterval(intervalId);
  }, [handleRightClick]);

  const handleTouchStart = (event: React.TouchEvent) => {
    startX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    if (!startX.current) {
      return;
    }

    const moveX = event.touches[0].clientX;
    const diffX = startX.current - moveX;

    if (diffX > 200) {
      handleRightClick();
    } else {
      handleLeftClick();
    }
  };

  return (
    <div className={styles['pictures-slider']}>
      <button
        className={`${styles['pictures-slider__button']} ${styles['pictures-slider__button--left']}`}
        onClick={handleLeftClick}
      ></button>

      <div
        className={styles['pictures-slider__images']}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div
          className={styles['pictures-slider__images-wrapper']}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((img, i) => (
            <img
              key={img}
              src={img}
              alt={`banner ${i + 1}`}
              className={styles['pictures-slider__img']}
            />
          ))}
        </div>
      </div>

      <button
        className={`${styles['pictures-slider__button']} ${styles['pictures-slider__button--right']}`}
        onClick={handleRightClick}
      ></button>

      <div className={styles['pictures-slider__dots']}>
        {images.map((img, i) => (
          <a
            key={img}
            className={`${styles['pictures-slider__dot']} ${index === i ? styles['pictures-slider__dot--is-active'] : ''}`}
            onClick={() => setIndex(i)}
          ></a>
        ))}
      </div>
    </div>
  );
};
