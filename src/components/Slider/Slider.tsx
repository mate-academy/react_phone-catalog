import classNames from 'classnames';
import styles from './Slider.module.scss';
import React, { useCallback, useEffect, useState } from 'react';
import { Icon } from '../ui/Icon';
import { ProductCategories } from '../../types/ProductCategories';
import { Link } from 'react-router-dom';

type SliderProps = {
  images: string[];
  infLoop?: boolean;
  children?: React.ReactNode;
};

const INTERVAL = 5000;

export const Slider: React.FC<SliderProps> = ({ images, infLoop = false }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveIndex(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  }, [images.length]);

  const handleGoToSlide = (currentIndex: number) => {
    setActiveIndex(currentIndex);
  };

  useEffect(() => {
    if (!infLoop) {
      return;
    }

    const autoPlayInterval = setInterval(nextSlide, INTERVAL);

    return () => {
      clearInterval(autoPlayInterval);
    };
  }, [infLoop, nextSlide, prevSlide]);

  const getPathByIndex = (index: number): string => {
    switch (index) {
      case 0:
        return `/${ProductCategories.phones}`;
      case 1:
        return `/${ProductCategories.tablets}`;
      case 2:
        return `/${ProductCategories.accessories}`;
      default:
        return '/';
    }
  };

  return (
    <div className={classNames(styles.slider)}>
      <button
        onClick={prevSlide}
        className={classNames(styles.slider__btn, styles['slider__btn--prev'])}
      >
        <Icon iconName="left" />
      </button>

      <div className={classNames(styles.slider__imageWrapper)}>
        {images.map((image, index) => {
          const path = getPathByIndex(index);

          return (
            <Link to={path} key={index} className={styles.slider__link}>
              <img
                src={image}
                className={classNames(styles.slider__image)}
                alt={`picture ${index}`}
                aria-hidden={activeIndex !== index}
                loading="lazy"
                style={{ translate: `${-100 * activeIndex}%` }}
              />
            </Link>
          );
        })}
      </div>

      <button
        onClick={nextSlide}
        className={classNames(styles.slider__btn, styles['slider__btn--next'])}
      >
        <Icon iconName="right" />
      </button>

      <div className={classNames(styles.slider__indicators)}>
        {images.map((_, index) => (
          <button
            key={index}
            className={classNames(styles.slider__indicator, {
              [styles['slider__indicator--active']]: index === activeIndex,
            })}
            onClick={() => handleGoToSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};
