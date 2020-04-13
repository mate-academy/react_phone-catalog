import React, { FC, useState } from 'react';
import './_Slider.scss';
import cx from 'classnames';
import arrow from '../../assets/arrow.svg';

const dotsArray = [0, 1, 2];

export const Slider: FC = () => {
  const [active, setActive] = useState(0);

  const handleLeft = () => {
    if (active === 0) {
      return setActive(2);
    }

    return setActive(active - 1);
  };

  const handleRight = () => {
    if (active === 2) {
      return setActive(0);
    }

    return setActive(active + 1);
  };

  return (
    <div className="slider">
      <button
        onClick={handleLeft}
        type="button"
        className="slider__button
          slider__button--left"
      >
        <img
          src={arrow}
          alt="slider_arrow_left"
          className="slider__arrow slider__arrow--left"
        />
      </button>
      <div className="slider__main">
        <div className="slider__dots">
          {
            dotsArray.map((position, ind) => (
              <span
                key={position}
                className={cx('slider__dot', {
                  'slider__dot--active': ind === active,
                })}
              />
            ))
          }
        </div>
      </div>
      <button
        onClick={handleRight}
        type="button"
        className="slider__button slider__button--right"
      >
        <img
          src={arrow}
          alt="slider_arrow_right"
          className="slider__arrow slider__arrow--right"
        />
      </button>
    </div>
  );
};
