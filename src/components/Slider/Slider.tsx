import React, { useEffect, useRef, useState } from 'react';
import './Slider.scss';
import classNames from 'classnames';

const images = [
  './img/image-main.png',
  './img/banner-phones.png',
  './img/banner-tablets.png',
];

export const Slider: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [currentShift, setCurrentShift] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const maxShift = (images.length - 1) * sliderWidth;

  const startX = useRef<number | null>(null);
  const endX = useRef<number | null>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (sliderRef.current) {
        const { width } = sliderRef.current.getBoundingClientRect();

        const newSliderWidth = width;

        setCurrentShift(prevShift => {
          const currentIndex = Math.round(prevShift / sliderWidth) || 0;

          return currentIndex * newSliderWidth;
        });

        setSliderWidth(newSliderWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, [sliderWidth]);

  useEffect(() => {
    if (!sliderWidth) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentShift(prevShift =>
        prevShift >= maxShift ? 0 : prevShift + sliderWidth,
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [sliderWidth, maxShift]);

  const handleNext = (): void => {
    if (!sliderWidth) {
      return;
    }

    setCurrentShift(prevShift =>
      prevShift >= maxShift ? 0 : prevShift + sliderWidth,
    );
  };

  const handlePrev = (): void => {
    if (!sliderWidth) {
      return;
    }

    setCurrentShift(prevShift =>
      prevShift === 0 ? maxShift : prevShift - sliderWidth,
    );
  };

  const handleMiddle = (): void => {
    if (!sliderWidth) {
      return;
    }

    const middleShift = Math.floor((images.length - 1) / 2) * sliderWidth;

    setCurrentShift(middleShift);
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
          className="slider__side-button slider__side-button--left"
          onClick={handlePrev}
        >
          <img src="/img/icons/arrow-left.svg" alt="icons arrow left" />
        </button>
        <div ref={sliderRef} className="slider__images">
          <ul
            className="slider__list"
            style={{
              transition: `transform 300ms ease-in-out`,
              transform: `translateX(-${currentShift}px)`,
            }}
          >
            {images.map(image => (
              <li className="slider__item" key={image}>
                <img
                  src={image}
                  alt={`photo ${image.slice(image.lastIndexOf('/') + 1, -4)}`}
                  className="slider__img"
                />
              </li>
            ))}
          </ul>
        </div>
        <button
          className="slider__side-button slider__side-button--right"
          onClick={handleNext}
        >
          <img src="/img/icons/arrow-right.svg" alt="icons arrow right" />
        </button>
      </div>
      <div className="slider__buttons">
        <button
          className={classNames('slider__button', {
            'is-active': currentShift === 0,
          })}
          onClick={handlePrev}
        ></button>
        <button
          className={classNames('slider__button slider__button--middle', {
            'is-active': currentShift === sliderWidth,
          })}
          onClick={handleMiddle}
        ></button>
        <button
          className={classNames('slider__button', {
            'is-active': currentShift === maxShift,
          })}
          onClick={handleNext}
        ></button>
      </div>
    </div>
  );
};
