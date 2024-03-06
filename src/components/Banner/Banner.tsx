import { useEffect, useState } from 'react';

import './index.scss';
import cn from 'classnames';
import { ICONS } from '../../images';

export const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(1);

  const nextSlideHandler = () => {
    setCurrentSlide(slideNumber => (slideNumber + 1 > 3 ? 1 : slideNumber + 1));
  };

  const prevSlideHandler = () => {
    setCurrentSlide(slideNumber => (slideNumber - 1 < 1 ? 3 : slideNumber - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(slideNumber =>
        slideNumber + 1 > 3 ? 1 : slideNumber + 1,
      );
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="slider">
      <div className="slider__content">
        <button
          type="button"
          className="slider__button"
          onClick={prevSlideHandler}
        >
          <img src={ICONS.arrowLeft} alt="Previous slide" />
        </button>

        <div className="slider__images">
          <div
            className={cn('slider__image slider__image--1', {
              'slider__image--active': currentSlide === 1,
            })}
          />

          <div
            className={cn('slider__image slider__image--2', {
              'slider__image--active': currentSlide === 2,
            })}
          />

          <div
            className={cn('slider__image slider__image--3', {
              'slider__image--active': currentSlide === 3,
            })}
          />
        </div>

        <button
          type="button"
          className="slider__button"
          onClick={nextSlideHandler}
        >
          <img src={ICONS.arrowRight} alt="Next slide" />
        </button>
      </div>

      <ul className="slider__nav">
        <li
          className={cn('slider__nav__item', {
            'slider__nav__item--active': currentSlide === 1,
          })}
        />
        <li
          className={cn('slider__nav__item', {
            'slider__nav__item--active': currentSlide === 2,
          })}
        />
        <li
          className={cn('slider__nav__item', {
            'slider__nav__item--active': currentSlide === 3,
          })}
        />
      </ul>
    </section>
  );
};
