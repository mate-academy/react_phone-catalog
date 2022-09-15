import React, { useState } from 'react';

import classNames from 'classnames';

import './SladerHome.scss';

export const SliderHome: React.FC = () => {
  const [indexSlide, setIndexSlide] = useState<number>(0);

  const forwardSlider = () => {
    if (indexSlide < 2) {
      setIndexSlide(indexSlide + 1);
    } else if (indexSlide === 2) {
      setIndexSlide(0);
    }
  };

  const backSlider = () => {
    if (indexSlide === 0) {
      setIndexSlide(2);
    } else if (indexSlide < 3) {
      setIndexSlide(indexSlide - 1);
    }
  };

  return (
    <div className="SliderHome">
      <div className="SliderHome__container">
        <button
          className="SliderHome__button"
          type="button"
          onClick={backSlider}
        >
          <i className="icon-Chevron-Arrow-Left" />
        </button>

        <div className="SliderHome__content">
          <img
            src="./img/banner/banner-3.jpg"
            alt="banner-iphone"
            className={classNames('SliderHome__img', { 'SliderHome__img--isActive': indexSlide === 0 })}
          />
          <img
            src="./img/banner/banner-2.png"
            alt="banner-iphone"
            className={classNames('SliderHome__img', { 'SliderHome__img--isActive': indexSlide === 1 })}
          />
          <img
            src="./img/banner/Banner.jpg"
            alt="banner-iphone"
            className={classNames('SliderHome__img', { 'SliderHome__img--isActive': indexSlide === 2 })}
          />
        </div>

        <button
          className="SliderHome__button"
          type="button"
          onClick={forwardSlider}
        >
          <i className="icon-Chevron-Arrow-Right" />
        </button>
      </div>
      <div className="SliderHome__indicates">
        <span
          className={classNames('SliderHome__indicate', { 'SliderHome__indicate--isActive': indexSlide === 0 })}
        />
        <span
          className={classNames('SliderHome__indicate', { 'SliderHome__indicate--isActive': indexSlide === 1 })}
        />
        <span
          className={classNames('SliderHome__indicate', { 'SliderHome__indicate--isActive': indexSlide === 2 })}
        />
      </div>
    </div>
  );
};
