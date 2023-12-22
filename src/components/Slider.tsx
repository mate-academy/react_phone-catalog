import React, { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import arrowRight from '../images/icons/Arrow_right.svg';
import banner1 from '../images/banners/banner1.png';
import banner2 from '../images/banners/banner2.png';
import banner3 from '../images/banners/banner3.png';

const slides = [
  banner1,
  banner2,
  banner3,
];

const links = [
  '/phones',
  '/tablets',
  '/accessories',
];

export const Slider: React.FC = () => {
  const [activeImg, setActiveImg] = useState(0);
  const width = activeImg * 100;
  const transform = `translateX(-${width}%)`;

  const handleArrowClick = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      if (activeImg === 2) {
        setActiveImg(0);
      } else {
        setActiveImg(activeImg + 1);
      }
    }

    if (direction === 'left') {
      if (activeImg === 0) {
        setActiveImg(2);
      } else {
        setActiveImg(activeImg - 1);
      }
    }
  };

  return (
    <div className="slider">
      <div className="slider__container">
        <button
          className="slider__button slider__button--left"
          type="button"
          onClick={() => handleArrowClick('left')}
        >
          <img
            src={arrowRight}
            alt="button left"
            className="slider__button-img"
          />
        </button>

        <div className="slider__img-container">
          <div
            className="slider__img-container__list"
            style={{ transform }}
          >
            {slides.map((img) => (
              <div key={img}>
                <Link
                  to={links[activeImg]}
                  className="slider__img-container__link"
                >
                  <img
                    className="slider__img"
                    src={img}
                    alt="banner"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>

        <button
          className="slider__button slider__button--right"
          type="button"
          onClick={() => handleArrowClick('right')}
        >
          <img
            src={arrowRight}
            alt="button right"
            className="slider__button-img"
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
