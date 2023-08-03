import React, { useState } from 'react';
import classNames from 'classnames';
import arrowRight from '../images/icons/Arrow_right.svg';
import banner1 from '../images/banners/banner1.png';
import banner2 from '../images/banners/banner2.png';
import banner3 from '../images/banners/banner3.png';

const slides = [
  banner1,
  banner2,
  banner3,
];

export const Slider: React.FC = () => {
  const [translateXValue, setTranslateXValue] = useState(0);
  const [activeImg, setActiveImg] = useState(0);
  const width = 1040;

  const handleArrowClick = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setActiveImg(activeImg + 1);
      setTranslateXValue((prev) => prev - width);
    } else {
      setActiveImg(activeImg - 1);
      setTranslateXValue(prev => prev + width);
    }
  };

  return (
    <div className="slider">
      <div className="slider__container">
        <button
          className="slider__button slider__button--left"
          type="button"
          onClick={() => handleArrowClick('left')}
          disabled={translateXValue === 0}
        >
          <img
            src={arrowRight}
            alt="button left"
            className={classNames({
              'slider__button-img--activity': translateXValue === 0,
            })}
          />
        </button>

        <div className="slider__img-container">
          <div
            className="slider__img-container-inner"
            style={{ transform: `translateX(${translateXValue}px)` }}
          >
            {slides.map((img) => (
              <>
                <img
                  key={img.length}
                  className="slider__img"
                  src={img}
                  alt="banner"
                />
              </>
            ))}
          </div>
        </div>

        <button
          className="slider__button slider__button--right"
          type="button"
          onClick={() => handleArrowClick('right')}
          disabled={translateXValue === -1 * (width * (slides.length - 1))}
        >
          <img
            src={arrowRight}
            alt="button left"
            className={classNames({
              'slider__button-img--activity':
              translateXValue === -1 * (width * (slides.length - 1)),
            })}
          />
        </button>
      </div>

      <div className="dots__indicators">
        {slides.map((img, index) => (
          <span
            key={img}
            className={classNames(
              'dots__indicator',
              { 'dots__indicator--is-active': index === activeImg },
            )}
          />
        ))}
      </div>
    </div>
  );
};
