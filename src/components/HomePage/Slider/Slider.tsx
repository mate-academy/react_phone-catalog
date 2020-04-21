import React from 'react';
import './Slider.scss';

export const Slider = () => {
  return (
    <>
      <div className="slider section-wrapper">
        <div className="slider__wrapper">
          <button
            type="button"
            className="slider__button"
          >
            <img src="/img/Icons/arrow-left.svg" alt="arrow-left" />
          </button>
          <ul className="slider__list">
            <li className="slider__item">
              <img
                src="img/slider-1.png"
                alt="iphones"
                className="slider__image"
              />
            </li>
          </ul>
          <button
            type="button"
            className="slider__button"
          >
            <img src="/img/Icons/arrow-right.svg" alt="arrow-right" />
          </button>
        </div>
      </div>

      <div className="slider-indicators">
        <div
          className="slider-indicators__item slider-indicators__item-active"
        />
        <div className="slider-indicators__item" />
        <div className="slider-indicators__item" />
      </div>
    </>
  );
};
