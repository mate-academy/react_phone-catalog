import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import './Slider.scss';
import phone from '../sliderphotos/banner-phones.png';
import tablet from '../sliderphotos/banner-tablets.png';
import accessories from '../sliderphotos/banner-accessories.png';

const images = [
  phone,
  tablet,
  accessories,
];

export const Slider: React.FC = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  const nextSlide = () => {
    setActiveSlideIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setActiveSlideIndex((prevIndex) => (prevIndex === 0
      ? images.length - 1
      : prevIndex - 1));
  };

  const handleDotKeyDown = (
    event: React.KeyboardEvent<HTMLSpanElement>,
    index: number,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setActiveSlideIndex(index);
    }
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div className="carousel">
        <div className="carousel__content">
          <button
            onClick={prevSlide}
            className="carousel__button"
            type="button"
            aria-label="label"
          >
            <span className="carousel__arrow--left" />
          </button>

          <div className="carousel__images">
            {images.map((imageUrl, index) => (
              <div
                className="carousel__image"
                key={imageUrl}
                style={{
                  opacity: index === activeSlideIndex ? 1 : 0,
                }}
              >
                <img
                  src={imageUrl}
                  alt={`Slide ${index + 1}`}
                  className="carousel__img"
                />
              </div>
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="carousel__button"
            type="button"
            aria-label="label"
          >
            <span className="carousel__arrow--right" />
          </button>
        </div>

        <div className="carousel__dots">
          {images.map((imageUrl, index) => (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <div
              onKeyDown={(event) => handleDotKeyDown(event, index)}
              className={cn('carousel__dot', {
                active: index === activeSlideIndex,
              })}
              key={imageUrl}
              onClick={() => setActiveSlideIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
