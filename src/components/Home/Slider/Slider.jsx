/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import './Slider.scss';
import firstSlide from '../../../assets/images/photos/slider/rsz_slider-1.jpg';
import secondSlide from '../../../assets/images/photos/slider/slider-2.jpg';
import thirdSlide from '../../../assets/images/photos/slider/slider-3.jpg';
import fourthSlide from '../../../assets/images/photos/slider/slider-4.jpg';
import fifthSlide from '../../../assets/images/photos/slider/slider-5.jpg';
import backArrow from '../../../assets/images/icons/back-arrow.svg';
import forvardArrow from '../../../assets/images/icons/forvard-arrow.svg';
import { Slide } from './Slide';

export const Slider = () => {
  const sliderArr = [
    firstSlide,
    secondSlide,
    thirdSlide,
    fifthSlide,
    fourthSlide,
  ];
  const [x, setX] = useState(0);

  const goLeft = () => {
    x === 0 ? setX(-100 * (sliderArr.length - 1)) : setX(x + 100);
  };

  const goRight = () => {
    x === -100 * (sliderArr.length - 1) ? setX(0) : setX(x - 100);
  };

  return (
    <>
      <button
        className="slider-container__btn slider-container__btn--back"
        type="button"
        onClick={goLeft}
      >
        <img src={backArrow} alt="back" />
      </button>

      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(${x}%)` }}
        >
          {sliderArr.map((slide, index) => (
            <div className="slide" key={index}>
              <Slide slide={slide} />
            </div>
          ))}
        </div>
      </div>
      <button
        className="slider-container__btn slider-container__btn--next"
        type="button"
        onClick={goRight}
      >
        <img src={forvardArrow} alt="forvard" />
      </button>
    </>
  );
};
