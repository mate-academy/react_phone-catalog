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
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide(prev => prev - 1);
  };

  const handleNextSlide = () => {
    setCurrentSlide(prev => prev + 1);
  };

  return (
    <div className="slider slider--with-margin">
      <button
        className="slider__button slider__button--left"
        type="button"
        onClick={handlePrevSlide}
        disabled={currentSlide <= 0}
      >
        <img src={arrowLeft} alt="" />
      </button>
      <div className="slider__img-container">
        <img
          className="slider__img"
          src={slides[currentSlide]}
          alt="banner"
        />
      </div>
      <button
        className="slider__button slider__button--right"
        type="button"
        onClick={handleNextSlide}
        disabled={currentSlide >= slides.length - 1}
      >
        <img src={arrowRight} alt="" />
      </button>
    </div>
  );
};
