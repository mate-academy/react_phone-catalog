import classNames from 'classnames';
import { useEffect, useState } from 'react';
import './Slider.scss';

export const Slider: React.FC = () => {
  const [bannerPosition, setBannerPosition] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => (
      bannerPosition === 2080
        ? setBannerPosition(0)
        : setBannerPosition((current) => current + 1040)
    ), 5000);

    return () => clearInterval(interval);
  }, [bannerPosition]);

  const nextBanner = () => {
    if (bannerPosition === 2080) {
      return setBannerPosition(0);
    }

    return setBannerPosition((current) => current + 1040);
  };

  const prevBanner = () => {
    if (bannerPosition === 0) {
      return setBannerPosition(2080);
    }

    return setBannerPosition((current) => current - 1040);
  };

  return (
    <div className="slider">
      <div className="slider__banner">
        <button
          type="button"
          aria-label="prevImg"
          className="slider__button"
          onClick={prevBanner}
        >
          <img
            src="./img/arrowLeft.svg"
            alt="prevImg"
            className="slider__arrow"
          />
        </button>

        <div
          className="slider__images"
        >
          <img
            src="./img/Banner1.png"
            alt="banner1"
            className="slider__img"
            style={{
              transform: `translateX(-${bannerPosition}px)`,
            }}
          />

          <img
            src="./img/Banner2.jpg"
            alt="banner2"
            className="slider__img"
            style={{
              transform: `translateX(-${bannerPosition}px)`,
            }}
          />

          <img
            src="./img/Banner3.png"
            alt="banner3"
            className="slider__img"
            style={{
              transform: `translateX(-${bannerPosition}px)`,
            }}
          />
        </div>

        <button
          type="button"
          aria-label="prevImg"
          className="slider__button"
          onClick={nextBanner}
        >
          <img
            src="./img/arrowRight.svg"
            alt="nextImg"
            className="slider__arrow"
          />
        </button>
      </div>

      <div className="slider__position">
        <div className={
          classNames(
            'slider__rectangle', {
              'slider__rectangle--isActive': bannerPosition === 0,
            },
          )
        }
        />
        <div className={
          classNames(
            'slider__rectangle', {
              'slider__rectangle--isActive': bannerPosition === 1040,
            },
          )
        }
        />
        <div className={
          classNames(
            'slider__rectangle', {
              'slider__rectangle--isActive': bannerPosition === 2080,
            },
          )
        }
        />
      </div>
    </div>
  );
};
