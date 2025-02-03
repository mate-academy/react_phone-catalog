import styles from './Banner.module.scss';
import React, { useCallback, useEffect, useRef, useState } from 'react';

export const Banner = () => {
  const images = [
    './public/img/banner-phones.png',
    './public/img/banner-accessories.png',
    './public/img/banner-tablets.png',
  ];
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
    if (startX.current === null) {
      return;
    }

    const moveX = event.touches[0].clientX;
    const diffX = startX.current - moveX;

    if (diffX > 50) {
      handleRightClick();
    } else {
      handleLeftClick();
    }
  };

  return (
    <div className={styles.banner}>
      <button
        className={`${styles.banner__button} ${styles['banner__button--left']}`}
        onClick={handleLeftClick}
      ></button>

      <div
        className={styles.banner__images}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div
          className={styles['banner__images-wrapper']}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((img, i) => (
            <img
              key={img}
              src={img}
              alt={`banner ${i + 1}`}
              className={styles.banner__img}
            />
          ))}
        </div>
      </div>

      <button
        className={`${styles.banner__button} ${styles['banner__button--right']}`}
        onClick={handleRightClick}
      ></button>

      <div className={styles.banner__dots}>
        {images.map((img, i) => (
          <a
            key={img[i]}
            className={`${styles.banner__dot} ${index === i ? styles[`banner__dot--is-active`] : ''}`}
            onClick={() => setIndex(i)}
          ></a>
        ))}
      </div>
    </div>
  );
};
