import { useEffect, useState } from 'react';
import classNames from 'classnames';
import './BannerSlider.scss';

const STEP = 1040;
const MAX_SHIFT = -2080;
const IMAGES = [
  './img/banner/banner-phones.png',
  './img/banner/banner-tablets.png',
  './img/banner/banner-accessories.png',
];

export const BannerSlider = () => {
  const [shift, setShift] = useState(0);

  const slideLeft = () => {
    if (shift >= 0) {
      setShift(MAX_SHIFT);
    } else {
      setShift((current) => current + STEP);
    }
  };

  const slideRight = () => {
    if (shift <= MAX_SHIFT) {
      setShift(0);
    } else {
      setShift((current) => current - STEP);
    }
  };

  useEffect(() => {
    const repeatSlide = setInterval(slideRight, 5000);

    return () => clearTimeout(repeatSlide);
  }, [shift]);

  return (
    <div className="banner-slider">
      <button
        type="button"
        className="banner-slider__button banner-slider__button--left"
        aria-label="Move left slider"
        onClick={slideLeft}
      />

      <div className="banner-slider__body">
        <ul
          className="banner-slider__list"
          style={{ transform: `translateX(${shift}px)` }}
        >
          {IMAGES.map((item, i) => (
            <li key={item}>
              <img
                src={item}
                className="banner-slider__image"
                alt={`banner ${i}`}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className="banner-slider__button banner-slider__button--right"
        aria-label="Move right slider"
        onClick={slideRight}
      />

      <div className="banner-slider__dots">
        {IMAGES.map((item, i) => {
          const position = i * -STEP;

          return (
            <button
              type="button"
              key={item}
              className={classNames(
                'banner-slider__dot-item',
                { 'banner-slider__dot-item--active': position === shift },
              )}
              aria-label={`choose banner ${i}`}
              onClick={() => setShift(position)}
            />
          );
        })}
      </div>
    </div>
  );
};
