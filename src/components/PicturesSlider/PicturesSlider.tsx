import React, { useState, useEffect } from 'react';
import styles from './PicturesSlider.module.scss';
import classNames from 'classnames';

import slide1 from '../../asset/img/slider/picture-1-desk.jpg';
import slide2 from '../../asset/img/slider/picture-2-desk.jpg';
import slide3 from '../../asset/img/slider/picture-3-desk.jpg';

const pictures = [slide1, slide2, slide3];

export const PicturesSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % pictures.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const changeSlide = (operation: string) => {
    switch (operation) {
      case 'increment':
        setCurrentIndex(prevIndex => (prevIndex + 1) % pictures.length);
        break;

      case 'decrement':
        setCurrentIndex(prevIndex =>
          prevIndex === 0 ? pictures.length - 1 : prevIndex - 1,
        );
        break;
    }
  };

  return (
    <div className={styles.slider}>
      <div className={styles.slider__img}>
        <img
          src={pictures[currentIndex]}
          alt={`PicturesSlider ${currentIndex}`}
        />
      </div>

      <div className={styles.dots}>
        {pictures.map((_, index) => (
          <span
            key={index}
            className={index === currentIndex ? styles.active : ''}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      <button
        className={classNames(
          styles.slider__button,
          styles['slider__button--previous'],
        )}
        onClick={() => changeSlide('decrement')}
      >
        <span className="icon icon--arrow icon--arrow--left"></span>
      </button>

      <button
        className={classNames(
          styles.slider__button,
          styles['slider__button--next'],
        )}
        onClick={() => changeSlide('increment')}
      >
        <span className="icon icon--arrow icon--arrow--right"></span>
      </button>
    </div>
  );
};
