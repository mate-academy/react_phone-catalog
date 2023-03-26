import './bannerSlider.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

import Phones from './images/banner-phones.png';
import Tablets from './images/banner-tablets.png';
import Accessories from './images/banner-accessories.png';

export const BannerSlider = () => {
  const [currentPositionSlider, setCurrentPositionSlider] = useState(0);
  const bannerImages = [
    [Phones, 'phones'],
    [Tablets, 'tablets'],
    [Accessories, 'accessories'],
  ];
  const carouselWidth = 1040;

  const onHandleMoveBanner = (action: 'prev' | 'next') => {
    const bannerLength = bannerImages.length;

    switch (action) {
      case 'prev':
        if (currentPositionSlider === 0) {
          setCurrentPositionSlider(-carouselWidth * (bannerLength - 1));
          break;
        }

        setCurrentPositionSlider((prev) => prev + carouselWidth);
        break;

      case 'next':
        if (currentPositionSlider === (
          -carouselWidth * (bannerLength - 1)
        )) {
          setCurrentPositionSlider(0);
          break;
        }

        setCurrentPositionSlider((prev) => prev - carouselWidth);
        break;

      default:
        setCurrentPositionSlider(0);
    }
  };

  useEffect(() => {
    const timeSlide = setTimeout(() => {
      onHandleMoveBanner('next');
    }, 5000);

    return () => clearTimeout(timeSlide);
  }, [currentPositionSlider]);

  return (
    <article className="banner-slider">
      <div className="banner-slider__basic">
        <button
          className="banner-slider__button banner-slider__button--prev"
          type="button"
          aria-label="button-prev"
          onClick={() => onHandleMoveBanner('prev')}
        />

        <div className="banner-slider__carousel">
          <div
            className="banner-slider__inner"
            style={{ transform: `translateX(${currentPositionSlider}px)` }}
          >
            {bannerImages.map((banner) => (
              <div key={banner[0]} className="banner-slider__carousel-item">
                <Link to={banner[1]}>
                  <img
                    className="banner-slider__carousel-image"
                    src={banner[0]}
                    alt="banner-img"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>

        <button
          className="banner-slider__button banner-slider__button--next"
          type="button"
          aria-label="button-next"
          onClick={() => onHandleMoveBanner('next')}
        />
      </div>

      <div className="banner-slider__indacators-wrapper">
        {[0, 1, 2].map((item, index) => (
          <div
            key={`${index + item}`}
            className={classNames('banner-slider__indicator', {
              'banner-slider__indicator--active':
            -currentPositionSlider / carouselWidth === index,
            })}
          />
        ))}
      </div>
    </article>
  );
};
