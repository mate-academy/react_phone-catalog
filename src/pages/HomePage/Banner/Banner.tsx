import './Banner.scss';
import '../../../utils/main.scss';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useAppSelector } from '../../../app/hooks';

export const Banner = () => {
  const BASE_URL =
    'https://mate-academy.github.io/react_phone-catalog/_new/img/';

  const slides = [
    BASE_URL + 'banner-phones.png',
    BASE_URL + 'banner-tablets.png',
    BASE_URL + 'banner-accessories.png',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();

  const nextSlide = () => {
    if (currentIndex !== 2) {
      setCurrentIndex(currentIndex + 1);
    } else if (currentIndex === 2) {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex !== 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (currentIndex === 0) {
      setCurrentIndex(2);
    }
  };

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      nextSlide();
    }, 5000);

    return () => clearTimeout(timerRef.current);
  });

  const theme = useAppSelector(state => state.themeSwitcher.theme);

  const titleClass = `banner__title theme-${theme}`;
  const bannerClass = `banner__button theme-${theme}`;
  const bannerLeft = `banner__left theme-${theme}`;
  const bannerRight = `banner__right theme-${theme}`;
  const bannerRectangle = `banner__rectangle__img theme-${theme}`;

  const rectangleActive = `banner__rectangle__img__active theme-${theme}`;

  return (
    <div className="banner grid--tablet grid--desktop">
      <h1
        className={`${titleClass} 
        grid__item--tablet-1-9
        grid__item--desktop-1-19`}
      >
        Welcome to Nice Gadgets store!
      </h1>
      <button
        className={`${bannerClass}
          ${bannerLeft}
          grid__item--tablet-1
          grid__item--desktop-1`}
        type="button"
        onClick={prevSlide}
      ></button>
      <div
        className="banner__box
        grid__item--tablet-2-11
        grid__item--desktop-2-23"
      >
        <div className="banner__slider">
          <div className="banner__cover">
            {slides.map((img, index) => (
              <img
                key={img}
                src={slides[index]}
                alt={img}
                className="banner__slider-image"
                style={{ translate: `${-100 * currentIndex}%` }}
              />
            ))}
          </div>
        </div>
      </div>
      <button
        className={`${bannerClass}
          ${bannerRight}
          grid__item--tablet-12
          grid__item--desktop-24`}
        type="button"
        onClick={nextSlide}
      ></button>

      <div
        className="banner__rectangle
        grid__item--tablet-6-7
        grid__item--desktop-13-14"
      >
        <div
          className={classNames(
            `${bannerRectangle}`,
            currentIndex === 0 ? `${rectangleActive}` : '',
          )}
        ></div>
        <div
          className={classNames(
            `${bannerRectangle}`,
            currentIndex === 1 ? `${rectangleActive}` : '',
          )}
        ></div>
        <div
          className={classNames(
            `${bannerRectangle}`,
            currentIndex === 2 ? `${rectangleActive}` : '',
          )}
        ></div>
      </div>
    </div>
  );
};
