import styles from './Slider.module.scss';
import stylesBtn from '../../styles/button.module.scss';
import stylesIcon from '../../styles/icon.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hooks';

const images = [
  'img/image-main.png',
  'img/banner-phones.png',
  'img/banner-tablets.png',
];

export const Slider: React.FC = () => {
  const { darkTheme } = useAppSelector(state => state.darkTheme);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const startX = useRef<number | null>(null);
  const endX = useRef<number | null>(null);

  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg(prevImg => (prevImg >= 2 ? 0 : prevImg + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentImg(0);
  }, []);

  const handleNext = (): void => {
    setCurrentImg(prevImg => (prevImg >= 2 ? 0 : prevImg + 1));
  };

  const handlePrev = (): void => {
    setCurrentImg(prevImg => (prevImg <= 0 ? 2 : prevImg - 1));
  };

  const handleTouchStart = (e: React.TouchEvent): void => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (): void => {
    if (startX.current === null || endX.current === null) {
      return;
    }

    const diff = startX.current - endX.current;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }

    startX.current = null;
    endX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent): void => {
    endX.current = e.touches[0].clientX;
  };

  return (
    <div
      className={styles.slider}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.slider__container}>
        <button
          className={`${styles.slider__sideButton} ${styles.slider__sideButton__right} ${stylesIcon.icon} ${darkTheme ? stylesIcon.icon__arrowLeft__dark : stylesIcon.icon__arrowLeft} ${stylesBtn.button}`}
          onClick={handlePrev}
        ></button>
        <div ref={sliderRef} className={styles.slider__images}>
          <div className={styles.slider__images__container}>
            {images.map(image => (
              <div
                className={styles.slider__images__imgBox}
                key={image}
                style={{ transform: `translateX(-${currentImg * 100}%)` }}
              >
                <img
                  className={styles.slider__img}
                  src={image}
                  alt={`photo ${currentImg}`}
                />
              </div>
            ))}
          </div>
        </div>
        <button
          className={`${styles.slider__sideButton} ${styles.slider__sideButton__right} ${stylesIcon.icon} ${darkTheme ? stylesIcon.icon__arrowRight__dark : stylesIcon.icon__arrowRight} ${stylesBtn.button}`}
          onClick={handleNext}
        ></button>
      </div>
      <div className={styles.slider__buttons}>
        {[0, 1, 2].map(digit => (
          <button
            key={digit}
            className={classNames(styles.slider__button, {
              [styles.active]: currentImg === digit,
            })}
            onClick={() => setCurrentImg(digit)}
          ></button>
        ))}
      </div>
    </div>
  );
};
