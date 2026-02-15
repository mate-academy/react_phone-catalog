import React, { useEffect, useRef, useState } from 'react';

import '@/styles/main.scss';
import styles from './PromoSlider.module.scss';

export const PromoSlider: React.FC = () => {
  const [imageIndex, setImageIndex] = useState<number>(0);

  const images = [
    'img/banner-phones.png',
    'img/banner-tablets.png',
    'img/banner-accessories.png',
  ];

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const minSwipeDistance = 50;

  const prev = () => {
    setImageIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const next = () => {
    setImageIndex(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > minSwipeDistance) {
      // Swipe left
      next();
    } else if (touchEndX.current - touchStartX.current > minSwipeDistance) {
      // Swipe right
      prev();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5000);

    return () => clearInterval(interval);
  });

  return (
    <div
      className={styles.promo_carousel}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className={styles.promo_carousel__banner}>
        <div className={styles.promo_carousel__button}>
          <button
            onClick={() => prev()}
            className="button__circle button__circle--arrow"
          >
            <i className="icon icon--left"></i>
          </button>
        </div>
        <div className={styles.promo_carousel__viewport}>
          <div
            className={styles.promo_carousel__wrapper}
            style={{
              transform: `translateX(-${imageIndex * (100 / images.length)}%)`,
            }}
          >
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`banner-${index}`}
                className={`${styles.promo_carousel__image} ${
                  index === imageIndex ? styles.active : styles.inactive
                }`}
              />
            ))}
          </div>
        </div>
        <div className={styles.promo_carousel__button}>
          <button
            onClick={() => next()}
            className="button__circle button__circle--arrow"
          >
            <i className="icon icon--right"></i>
          </button>
        </div>
      </div>
      <div className={styles.promo_carousel__pagination}>
        {images.map((_, index) => (
          <div
            key={index}
            className={`${styles['promo_carousel__pagination--item']} ${
              index === imageIndex ? styles.activePagination : ''
            }`}
            onClick={() => setImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
