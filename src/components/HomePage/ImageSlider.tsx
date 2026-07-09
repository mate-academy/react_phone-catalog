import styles from './ImageSlider.module.scss';
import arrowLeft from '../../images/Icons/Arrow-Left.png';
import arrowRight from '../../images/Icons/Arrow-Right.png';
import bunner1 from '../../../public/img/banner-phones.png';
import bunner2 from '../../../public/img/banner-tablets.png';
import bunner3 from '../../../public/img/banner-accessories.png';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

export const ImageSlider: React.FC = () => {
  const images = [bunner1, bunner2, bunner3];

  const [offset, setOffset] = useState<number>(0);
  const [toucheStartX, setTouchStartX] = useState<number | null>(null);
  const [toucheEndX, setToucheEndX] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOffset(prev => (prev === 200 ? 0 : prev + 100));
    }, 5000);

    return () => clearTimeout(timer);
  }, [offset]);

  const move = (direction: 'next' | 'prev') => {
    setOffset(prev => {
      switch (direction) {
        case 'next':
          return prev === 200 ? 0 : prev + 100;

        case 'prev':
          return prev === 0 ? 200 : prev - 100;

        default:
          return prev;
      }
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setToucheEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (toucheStartX === null || toucheEndX === null) {
      return;
    }

    const distance = toucheStartX - toucheEndX;
    const minSwipe = 40;

    if (distance > minSwipe) {
      move('next');
    }

    if (distance < minSwipe) {
      move('prev');
    }

    setTouchStartX(0);
    setToucheEndX(0);
  };

  const getActiveDot = (par: number) => {
    return classNames(styles.imageSlider__dot, {
      [styles.imageSlider__activeDot]: offset === par,
    });
  };

  return (
    <div className={styles.imageSlider}>
      <div className={styles.imageSlider__container}>
        <button
          className={styles.imageSlider__buttonLeft}
          onClick={() => move('prev')}
        >
          <img src={arrowLeft} />
        </button>
        <div
          className={styles.imageSlider__imageContainer}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <ul
            className={styles.imageSlider__list}
            style={{ transform: `translateX(-${offset}%)` }}
          >
            {images.map((src, index) => (
              <li key={index} className={styles.imageSlider__item}>
                <img
                  className={styles.imageSlider__img}
                  src={src}
                  alt={`${index + 1}`}
                />
              </li>
            ))}
          </ul>
        </div>
        <button
          className={styles.imageSlider__buttonRight}
          onClick={() => move('next')}
        >
          <img src={arrowRight} />
        </button>
      </div>

      <div className={styles.imageSlider__dots}>
        <button
          className={getActiveDot(0)}
          onClick={() => setOffset(0)}
        ></button>
        <button
          className={getActiveDot(100)}
          onClick={() => setOffset(100)}
        ></button>
        <button
          className={getActiveDot(200)}
          onClick={() => setOffset(200)}
        ></button>
      </div>
    </div>
  );
};
