import React from 'react';
import './Slider.scss';
import sliderFirst from '../../assets/images/photos/slider/slider-1.jpg';
import forvardArrow from '../../assets/images/icons/back-arrow.svg';
import backArrow from '../../assets/images/icons/forvard-arrow.svg';

export const Slider = () => (
  <div className="slider-container">
    <div className="slider-content">
      <button
        className="slider-content__btn slider-content__btn--back"
        type="button"
      >
        <img src={backArrow} alt="back" className="slider-content__btn-back" />
      </button>
      <img
        src={sliderFirst}
        alt="phone samsung"
        className="slider-content__img"
      />
      <button
        className="slider-content__btn slider-content__btn--next"
        type="button"
      >
        <img
          src={forvardArrow}
          alt="back"
          className="slider-content__btn-back"
        />
      </button>
    </div>
    <div className="dots">
      <button className="dots__btn" type="button" />
      <button className="dots__btn" type="button" />
      <button className="dots__btn" type="button" />
    </div>
  </div>
);
