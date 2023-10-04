import { useState } from 'react';

import banner1 from '../imgs/banner/banner1.png';
import banner2 from '../imgs/banner/banner2.jpg';
import banner3 from '../imgs/banner/banner3.jpg';

import arrowRight from '../imgs/icons/arrow-right.svg';
import arrowLeft from '../imgs/icons/arrow-left.svg';

const slides = [
  banner1,
  banner2,
  banner3,
];

export const Slider: React.FC = () => {
  const [translateXValue, setTranslateXValue] = useState(0);
  const width = 1040;

  const handleArrowClick = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setTranslateXValue((prev) => prev - width);
    } else {
      setTranslateXValue((prev) => prev + width);
    }
  };

  return (
    <div className="slider slider--with-margin">
      <button
        className="slider__button slider__button--left"
        type="button"
        onClick={() => handleArrowClick('left')}
        disabled={translateXValue === 0}
      >
        <img src={arrowLeft} alt="button left" />
      </button>
      <div className="slider__img-container">
        <div
          className="slider__img-container-inner"
          style={{ transform: `translateX(${translateXValue}px)` }}
        >
          {slides.map(img => (
            <img
              className="slider__img"
              src={img}
              alt="banner"
            />
          ))}
        </div>
      </div>
      <button
        className="slider__button slider__button--right"
        type="button"
        onClick={() => handleArrowClick('right')}
        disabled={translateXValue === -1 * (width * (slides.length - 1))}
      >
        <img src={arrowRight} alt="button right" />
      </button>
    </div>
  );
};
