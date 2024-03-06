/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from 'react';
import cn from 'classnames';

export const BannerSlider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = [
    'img/banner-phones.png',
    'img/banner-tablets.png',
    'img/banner-accessories.png',
  ];

  const nextSlide = () => {
    setSlideIndex((slideIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setSlideIndex((slideIndex - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [slideIndex]);

  const setSlide = (index: number) => {
    setSlideIndex(index);
  };

  return (
    <div className="banner">
      <div className="banner__top">
        <div className="banner__photos">
          {slides.map((slide, index) => (
            <img
              key={slide}
              className={cn('banner__photo', {
                'is-active': index === slideIndex,
              })}
              src={slide}
              alt={`Slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="banner__buttons">
          <button
            className="banner__button banner__button--prev"
            onClick={prevSlide}
            type="button"
          >
            &#10094;
          </button>

          <button
            className="banner__button banner__button--next"
            onClick={nextSlide}
            type="button"
          >
            &#10095;
          </button>

        </div>
      </div>

      <div className="indicators">
        {slides.map((slide, index) => (
          <div className="indicators__indicator">
            <span
              key={slide}
              className={cn('indicator', { 'is-active': index === slideIndex })}
              onClick={() => setSlide(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
