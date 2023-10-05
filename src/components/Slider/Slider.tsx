import { useState } from 'react';
import classNames from 'classnames';
import './Slider.scss';
import phone from '../../../public/img/products/slider/banner-phone.png';
import tablet from './slider-images/banner-tablets.png';
import accessories from './slider-images/banner-accessories.png';

export const Slider = () => {
  const images = [
    phone,
    tablet,
    accessories,
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
    <div className="top-slider">
      <div className="top-slider__slider">
        <button
          className="top-slider__button"
          type="button"
          onClick={() => onHandleMoveBanner('prev')}
        >
          <span className="top-slider__arrow--left" />
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
          className="top-slider__button"
          type="button"
          onClick={() => onHandleMoveBanner('next')}
        >
          <span className="top-slider__arrow--right" />
        </button>
      </div>

      <div className="top-slider__dots">
        {images.map((_, index) => (
          <div
            key={images[index].id}
            className={classNames(
              'top-slider__dot', {
                'top-slider__dot--active':
                -currentSlide / carouselWidth === index,
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
  );
};
