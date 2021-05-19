import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { SLIDER_DATA } from '../../../../helpers/variables';
import './ImageSlider.scss';

export const ImageSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  let timerId: ReturnType<typeof setTimeout>;

  const nextSlide = () => {
    setCurrentImageIndex((prevState) => (
      prevState === SLIDER_DATA.length - 1 ? 0 : prevState + 1
    ));

    clearInterval(timerId);
  };

  const prevSlide = () => {
    setCurrentImageIndex((prevState) => (
      prevState === 0 ? SLIDER_DATA.length - 1 : prevState - 1
    ));

    clearInterval(timerId);
  };

  const selectCertainSlide = (slideNumber: number) => {
    setCurrentImageIndex(slideNumber);
    clearInterval(timerId);
  };

  useEffect(() => {
    timerId = setTimeout(nextSlide, 5000);
  });

  return (
    <div className="Slider Page-Slider">
      <button
        type="button"
        className="Slider-Arrow"
        onClick={prevSlide}
      >
        <img src="./img/icons/arrow-left-active.svg" alt="arrow-left" />
      </button>
      <img
        className="Slider-Image"
        src={SLIDER_DATA[currentImageIndex].image}
        alt="phone"
      />

      <button
        type="button"
        className="Slider-Arrow"
        onClick={nextSlide}
      >
        <img src="./img/icons/arrow-right-active.svg" alt="arrow-right" />
      </button>
      <div className="Slider-Icons">
        {SLIDER_DATA.map((slide, index) => (
          <button
            key={slide.id}
            className={classnames('Slider-Icon',
              { 'Slider-Icon_active': index === currentImageIndex })}
            type="button"
            aria-label="Slider-icon"
            onClick={() => {
              selectCertainSlide(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};
