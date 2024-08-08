import React, { useState, useEffect } from 'react';
import styles from './PicturesSlider.module.scss';
import { Order } from '../Order';
import classNames from 'classnames';

interface PicturesSliderProps {
  images: string[];
}

export const PicturesSlider: React.FC<PicturesSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  const goToPrevious = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles.pictures}>
      <div className={styles.container}>
        <div className={styles.orderBanner}>
          <Order />
        </div>
        <div className={styles.slider}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index}`}
              className={classNames(styles.slide, {
                [styles.active]: index === currentIndex,
              })}
            />
          ))}
        </div>
      </div>
      <button
        className={classNames(styles.previous, styles.controls)}
        onClick={goToPrevious}
      >
        <div className={styles.arrow}>
          <span>
            <img src="img/icons/Arrow_Left.svg" alt="arow_left" />
          </span>
        </div>
      </button>
      <button
        className={classNames(styles.next, styles.controls)}
        onClick={goToNext}
      >
        <div className={styles.arrow}>
          <span>
            <img src="img/icons/Arrow_Right.svg" alt="arow_left" />
          </span>
        </div>
      </button>
      <div className={styles.indicators}>
        {images.map((_, index) => (
          <div
            key={index}
            className={classNames(styles.indicator, {
              [styles.indicatorActive]: index === currentIndex,
            })}
            onClick={() => goToImage(index)}
          />
        ))}
      </div>
    </div>
  );
};
