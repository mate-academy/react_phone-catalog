import React, { useEffect, useRef, useState } from 'react';
import './Slider.scss';
import classNames from 'classnames';

const images = [
  'img/image-main.png',
  'img/banner-phones.png',
  'img/banner-tablets.png',
];

export const Slider: React.FC = () => {
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
      className="slider"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="slider__container">
        <button
          className="slider__side-button slider__side-button--left icon button"
          onClick={handlePrev}
        ></button>
        <div ref={sliderRef} className="slider__images">
          <div className="slider__images__container">
            {images.map(image => (
              <div
                className="slider__images__img-box"
                key={image}
                style={{ transform: `translateX(-${currentImg * 100}%)` }}
              >
                <img
                  className="slider__img"
                  src={image}
                  alt={`photo ${currentImg}`}
                />
              </div>
            ))}
          </div>
        </div>
        <button
          className="slider__side-button slider__side-button--right icon button"
          onClick={handleNext}
        ></button>
      </div>
      <div className="slider__buttons">
        {[0, 1, 2].map(digit => (
          <button
            key={digit}
            className={classNames('slider__button', {
              'is-active': currentImg === digit,
            })}
            onClick={() => setCurrentImg(digit)}
          ></button>
        ))}
      </div>
    </div>
  );
};
