import { useEffect, useState } from 'react';
import classNames from 'classnames';
import './BannerSlider.scss';

const IMAGES = [
  './img/banner/banner-phones.png',
  './img/banner/banner-tablets.png',
  './img/banner/banner-accessories.png',
];

export const BannerSlider = () => {
  const [shift, setShift] = useState(0);

  const slideLeft = () => {
    if (shift >= 0) {
      setShift(-2080);
    } else {
      setShift((current) => current + 1040);
    }
  };

  const slideRight = () => {
    if (shift <= -2080) {
      setShift(0);
    } else {
      setShift((current) => current - 1040);
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
          const position = i * -1040;

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
