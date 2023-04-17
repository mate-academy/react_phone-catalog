import './Slider.scss';

import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { SliderImg } from '../../Types/SliderImgTypes';
import { sliderImages } from '../../Helpers/Variables';

export const Slider = () => {
  /* eslint-disable no-return-assign,
    no-param-reassign,
    jsx-a11y/control-has-associated-label,
    prefer-template
  */

  const [offset, setOffset] = useState(0);
  const [slides] = useState<SliderImg[]>(sliderImages);
  const [slideWidth, setSlideWidth] = useState(0);
  const [screenWidth] = useState(window.innerWidth);

  const setScreenWidth = () => {
    if (screenWidth <= 380) {
      setSlideWidth(210);
    } else if (screenWidth <= 640) {
      setSlideWidth(310);
    } else if (screenWidth >= 640 && screenWidth < 1200) {
      setSlideWidth(560);
    } else {
      setSlideWidth(750);
    }
  };

  const minOffset = 0;
  const maxOffset = -(slideWidth * (slides.length - 1));

  useEffect(() => {
    setScreenWidth();
  }, [screenWidth]);

  const onNext = () => {
    setOffset((prev) => (
      Math.min(prev += slideWidth, 0)
    ));
  };

  const onPrev = () => {
    setOffset((prev) => (
      Math.max(prev -= slideWidth, -(slideWidth * (sliderImages.length - 1)))
    ));
  };

  useEffect(() => {
    const time = setInterval(onPrev, 3000);

    return () => {
      clearInterval(time);
    };
  }, [offset]);

  return (
    <section className="slider">
      <div className="slider__container">
        <button
          type="button"
          onClick={onNext}
          className={classNames(
            'slider__button',
            { 'slider__button--active': offset === minOffset },
          )}
        >
          <img
            src="Images/arrow-icon--left.svg"
            alt="Arrow icon left"
          />
        </button>

        <div className="slider__wrapper">
          <div
            className="slider__items"
            style={{ transform: `translateX(${offset}px)`, transition: '1s' }}
          >
            {slides.map((el) => (
              <img
                key={el.id}
                src={`./new/img/${el.url}`}
                className="slider__img"
                alt={`slider Iamge ${el.id}`}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={onPrev}
          className={classNames(
            'slider__button',
            { 'slider__button--active': offset === maxOffset },
          )}
        >
          <img
            src="Images/arrow-icon--left.svg"
            style={{ transform: 'rotate(180deg)' }}
            alt="Arrow icon right"
          />
        </button>
      </div>

      <div className="slider__dots">
        {slides.map((el) => {
          const current = -(el.id * slideWidth);

          return (
            <button
              type="button"
              key={el.id}
              className={classNames(
                'slider__dot',
                { 'slider__dot--active': current === offset },
              )}
            />
          );
        })}
      </div>
    </section>
  );
};
