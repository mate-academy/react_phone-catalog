import React, { FC, useState } from 'react';

const Slider: FC = () => {
  const [position, setPosition] = useState(0);
  const [offset] = useState(1040);

  const slidesMove = {
    display: 'flex',

    transform: `translateX(${position}px)`,

    transition: 'transform 0.5s',
  };

  const nextSlide = () => {
    if (position === -offset * 2) {
      setPosition(0);

      return;
    }

    setPosition(position - offset);
  };

  const prevSlide = () => {
    if (position === 0) {
      setPosition(-offset * 2);

      return;
    }

    setPosition(position + offset);
  };

  return (
    <div className="slider">
      <div className="slider__main">
        <button
          type="button"
          className="slider__btn"
          onClick={prevSlide}
        >
          &#8249;
        </button>
        <div className="slider__container">
          <div className="slider__slides">
            <div style={slidesMove}>
              <img src={`${window.location.origin}/img/banner.png`} alt="iPhones" />
              <img src={`${window.location.origin}/img/banner.png`} alt="iPhones" />
              <img src={`${window.location.origin}/img/banner.png`} alt="iPhones" />
            </div>
          </div>
        </div>
        <button
          type="button"
          className="slider__btn"
          onClick={nextSlide}
        >
          &#8250;
        </button>
      </div>

      <div className="slider__indicators">
        <div className="slider__indicator slider__indicator--active" />
        <div className="slider__indicator" />
        <div className="slider__indicator" />
      </div>
    </div>
  );
};

export default Slider;
