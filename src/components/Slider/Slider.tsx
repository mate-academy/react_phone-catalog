import React, { FC } from 'react';
import './Slider.scss';

const Slider: FC = () => {
  return (
    <div className="slider">
      <div className="slider__main">
        <button type="button" className="slider__btn">
          &#8249;
        </button>
        <div className="slider__container">
          <img src={`${window.location.origin}/img/banner.png`} alt="iPhones" />
          <img src={`${window.location.origin}/img/banner.png`} alt="iPhones" />
          <img src={`${window.location.origin}/img/banner.png`} alt="iPhones" />
        </div>
        <button type="button" className="slider__btn">
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
