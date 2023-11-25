/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable max-len */
import { useState } from 'react';
// import { useState } from 'react';
import classNames from 'classnames';
// @ts-ignore
import accessories from './images/banner-accessories.png';
// @ts-ignore
import phones from './images/banner-phones.png';
// @ts-ignore
import tablets from './images/banner-tablets.png';
// @ts-ignore
import leftArrow from './images/arrowLeft.svg';
// @ts-ignore
import rightArrow from './images/arrowRight.svg';

export const TopSlider = () => {
  const images = [
    phones,
    accessories,
    tablets,
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselWidth = 1040;

  const onHandleMoveBanner = (action: 'prev' | 'next') => {
    const sliderLength = images.length;
    const maxSlide = -carouselWidth * (sliderLength - 1);

    switch (action) {
      case 'prev':
        if (currentSlide === 0) {
          setCurrentSlide(maxSlide);
          break;
        }

        setCurrentSlide((prev) => prev + carouselWidth);
        break;

      case 'next':
        if (currentSlide === maxSlide) {
          setCurrentSlide(0);
          break;
        }

        setCurrentSlide((prev) => prev - carouselWidth);
        break;

      default:
        setCurrentSlide(0);
    }
  };

  return (
    <>
      <div className="top-slider">
        <div className="top-slider__slider">
          <button
            type="button"
            className="arrow arrow__box"
            onClick={() => onHandleMoveBanner('prev')}
          >
            <img src={leftArrow} alt="leftArrow" />
          </button>

          <div className="top-slider__images">
            <div
              className="top-slider__inner"
              style={{ transform: `translateX(${currentSlide}px)` }}
            >
              {images.map((image) => (
                <div className="top-slider__images--item" key={image}>
                  <img
                    src={image}
                    alt="slide"
                    className="top-slider__image"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="arrow arrow__box"
            onClick={() => onHandleMoveBanner('next')}
          >
            <img src={rightArrow} alt="rightArrow" />
          </button>
        </div>

        <div className="top-slider__dots">
          {images.map((_, index) => (
            <div
              key={images[index].id}
              className={classNames(
                'top-slider__dot', {
                  'top-slider__dot--active': -currentSlide / carouselWidth === index,
                },
              )}
              onClick={() => setCurrentSlide(-carouselWidth * index)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  setCurrentSlide(-carouselWidth * index);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <p hidden>
                dots
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
