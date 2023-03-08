import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import '../../styles/grid.scss';
import './HomePageSlider.scss';
import bannerPhones from '../../images/banner-phones.png';
import bannerTablets from '../../images/banner-tablets.png';
import bannerAccesories from '../../images/banner-accessories.png';
import arrowLeft from '../../images/arrow-left.svg';
import arrowRight from '../../images/arrow-right.svg';

export const HomePageSlider: React.FC = () => {
  const [transform, setTransform] = useState(0);
  const slider = useRef<HTMLDivElement>(null);

  const images = [
    bannerPhones,
    bannerTablets,
    bannerAccesories,
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (transform < images.length - 1) {
        setTransform(transform + 1);
      } else {
        setTransform(0);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [transform]);

  const handleNext = () => {
    if (transform !== images.length - 1) {
      setTransform(transform + 1);
    } else {
      setTransform(0);
    }
  };

  const handlePrev = () => {
    if (transform !== 0) {
      setTransform(transform - 1);
    } else {
      setTransform(0);
    }
  };

  const slideWidth = slider.current ? slider.current.offsetWidth : 0;

  return (
    <div className="home-page-slider">
      <div className="home-page-slider__content">
        <div className="grid">
          <button
            type="button"
            className="home-page-slider__button grid__item grid__item--1-1"
            onClick={handlePrev}
          >
            <img src={arrowLeft} alt="arrow left" />
          </button>

          <div
            className="home-page-slider__wrapper grid__item grid__item--2-23"
          >
            <div
              className="home-page-slider__slides"
              style={{ transform: `translateX(-${transform * slideWidth}px)` }}
            >
              {images.map(image => (
                <div
                  key={image}
                  className="home-page-slider__image-wrapper"
                  ref={slider}
                >
                  <img
                    src={image}
                    alt="phones"
                    className="home-page-slider__image"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="home-page-slider__button grid__item grid__item--24-24"
            onClick={handleNext}
          >
            <img src={arrowRight} alt="arrow right" />
          </button>
        </div>

        <div className="home-page-slider__radio-controls">
          <label
            className={cn('home-page-slider__radio-control', {
              'home-page-slider__radio-control--checked': transform === 0,
            })}
          >
            <input
              id="radio-1"
              type="radio"
              className="home-page-slider__radio-button"
              checked={transform === 0}
              onChange={() => setTransform(0)}
            />
          </label>

          <label
            className={cn('home-page-slider__radio-control', {
              'home-page-slider__radio-control--checked': transform === 1,
            })}
          >
            <input
              id="radio-2"
              type="radio"
              className="home-page-slider__radio-button"
              checked={transform === 1}
              onChange={() => setTransform(1)}
            />
          </label>

          <label
            className={cn('home-page-slider__radio-control', {
              'home-page-slider__radio-control--checked': transform === 2,
            })}
          >
            <input
              id="radio-3"
              type="radio"
              className="home-page-slider__radio-button"
              checked={transform === 2}
              onChange={() => setTransform(2)}
            />
          </label>
        </div>
      </div>
    </div>
  );
};
