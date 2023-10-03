import React, { useState, useEffect, useMemo } from 'react';
import cn from 'classnames';

import {
  ReactComponent as ArrowRigth,
} from '../../images/icons/arrow_rigth.svg';
import {
  ReactComponent as ArrowLeft,
} from '../../images/icons/arrow_left.svg';
import { homeSliderData } from '../../data/homeSliderData';

const DEFAULT_PICTURES_SWIPE_DELAY = 5000;

export const CarouselSlider: React.FC = () => {
  const [translate, setTranslate] = useState(0);
  const maxTranslate = (homeSliderData.length - 1) * -100;

  const handleNextButtonClick = () => {
    setTranslate((currentTranslate) => {
      const newTranslate = currentTranslate - 100 < maxTranslate
        ? 0
        : currentTranslate - 100;

      return newTranslate;
    });
  };

  const navData = useMemo(() => (
    homeSliderData
      .map((img) => homeSliderData.indexOf(img) * -100)
  ), [homeSliderData]);

  const handlePrevButtonClick = () => {
    setTranslate((currentTranslate) => {
      const newTranslate = currentTranslate + 100 > 0
        ? maxTranslate
        : currentTranslate + 100;

      return newTranslate;
    });
  };

  useEffect(() => {
    setInterval(() => handleNextButtonClick(), DEFAULT_PICTURES_SWIPE_DELAY);
  }, []);

  return (
    <div className="carousel">
      <div className="carousel__container">
        <button
          className="carousel__action"
          type="button"
          onClick={handlePrevButtonClick}
        >
          <ArrowLeft />
        </button>
        <div className="carousel__list-container">
          <ul
            className="carousel__list"
            style={{ transform: `translateX(${translate}%)` }}
          >
            {homeSliderData.map(img => (
              <li className="carousel__item" key={img}>
                <img
                  className="carousel__image"
                  src={img}
                  alt="bunner"
                />
              </li>
            ))}
          </ul>
        </div>
        <button
          className="carousel__action"
          type="button"
          onClick={handleNextButtonClick}
        >
          <ArrowRigth />
        </button>
      </div>
      <div className="carousel__nav">
        {navData.map(nav => (
          <button
            key={nav}
            className="carousel__nav-link"
            type="button"
            onClick={() => setTranslate(nav)}
          >
            <div className={cn('carousel__nav-icon',
              { 'carousel__nav-icon--active': translate === nav })}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
