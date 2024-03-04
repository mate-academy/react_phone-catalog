/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from 'react';
import classNames from 'classnames';

import './Banners.scss';
import { useScreenSize } from '../../helpers/hooks/useScreenSize';

const banners = [
  'img/banners/banner-phones.png',
  'img/banners/banner-tablets.png',
  'img/banners/banner-accessories.png',
];

export const Banners = () => {
  const [bannerWidth, setBannerWidth] = useState(1040);
  const [position, setPosition] = useState(0);
  const screenSize = useScreenSize();

  useEffect(() => {
    if (screenSize.width < 1176) {
      setBannerWidth(screenSize.width - 136);
    } else {
      setBannerWidth(1040);
    }
  }, [screenSize.width]);

  let intervalId = 0;

  const handlePrevClick = () => {
    clearInterval(intervalId);

    setPosition((currentPosition) => {
      if (currentPosition === 0) {
        return currentPosition - bannerWidth * (banners.length - 1);
      }

      return currentPosition + bannerWidth;
    });
  };

  const carousel = () => {
    setPosition((currentPosition) => {
      const lastPosition = -bannerWidth * (banners.length - 1);

      if (currentPosition === lastPosition) {
        return 0;
      }

      return currentPosition - bannerWidth;
    });
  };

  useEffect(() => {
    intervalId = window.setInterval(() => {
      carousel();
    }, 5000);

    return () => clearInterval(intervalId);
  });

  const handleNextClick = () => {
    clearInterval(intervalId);

    carousel();
  };

  const handleDotClick = (imgIndex: number) => {
    clearInterval(intervalId);

    setPosition(-imgIndex * bannerWidth);
  };

  return (
    <div className="Banners">
      <button
        type="button"
        className="Banners__button Banners__button--left"
        onClick={handlePrevClick}
      />

      <div
        className="Banners__wrapper"
        style={{
          width: `${bannerWidth}px`,
        }}
      >
        <ul
          className="Banners__list"
          style={{
            width: `${bannerWidth * banners.length}px`,
          }}
        >
          {banners.map((image, index) => (
            <li
              key={image}
              className="Banners__item"
              style={{
                width: `${bannerWidth}px`,
                transform: `translateX(${position}px)`,
              }}
            >
              <img
                src={image}
                alt={`Banner ${index + 1}`}
                className="Banners__banner"
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className="Banners__button"
        onClick={handleNextClick}
      />

      <div className="Banners__dots">
        {banners.map((image, imgIndex) => (
          <button
            key={image}
            type="button"
            className="Banners__dot-link"
            onClick={() => handleDotClick(imgIndex)}
          >
            <div
              className={classNames('Banners__dot', {
                'Banners__dot--active': imgIndex === -position / bannerWidth,
              })}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
