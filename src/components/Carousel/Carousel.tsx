import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import './Carousel.scss';

import banner1 from '../../images/banners/banner1.png';
import banner2 from '../../images/banners/banner2.png';
import banner3 from '../../images/banners/banner3.png';

import arrowLeft from '../../images/arrows/arrow-left.svg';
import arrowRight from '../../images/arrows/arrow-right.svg';

const slideImages = [banner1, banner2, banner3];

export const Carousel: React.FC = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  const nextSlide = () => {
    setActiveSlideIndex((prevIndex) => (prevIndex + 1) % slideImages.length);
  };

  const prevSlide = () => {
    setActiveSlideIndex((prevIndex) => (prevIndex === 0
      ? slideImages.length - 1
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
    <div className="carousel">
      <div className="carousel__content">
        <button onClick={prevSlide} className="carousel__button" type="button">
          <img src={arrowLeft} alt="arrow-left" />
        </button>

        <div className="carousel__images">
          {slideImages.map((imageUrl, index) => (
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

        <button onClick={nextSlide} className="carousel__button" type="button">
          <img src={arrowRight} alt="arrow-right" />
        </button>
      </div>

      <div className="carousel__dots">
        {slideImages.map((_imageUrl, index) => (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <div
            onKeyDown={(event) => handleDotKeyDown(event, index)}
            className={cn('carousel__dot', {
              active: index === activeSlideIndex,
            })}
            key={_imageUrl}
            onClick={() => setActiveSlideIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
