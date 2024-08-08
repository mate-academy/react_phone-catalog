import classNames from 'classnames';
import styles from './Slider.module.scss';
import React, { useEffect, useState } from 'react';
import { Icon } from '../ui/Icon';

type SliderProps = {
  images: string[];
  infLoop?: boolean;
  children?: React.ReactNode;
};

const INTERVAL = 5000;

export const Slider: React.FC<SliderProps> = ({ images, infLoop = false }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setActiveIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [INTERVAL, nextSlide]);

  return (
    <div className={classNames(styles.slider)}>
      <button
        onClick={prevSlide}
        className={classNames(styles.slider__btn, styles['slider__btn--prev'])}
      >
        <Icon iconName="left" />
      </button>

      <div className={classNames(styles.slider__imageWrapper)}>
        <a href="#">
          <img
            src={images[activeIndex]}
            className={classNames(styles.slider__image)}
            alt={`picture ${activeIndex}`}
          />
        </a>
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
