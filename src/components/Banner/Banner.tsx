/* eslint-disable react/prefer-stateless-function */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useRef } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './Banner.scss';

export const Banner = () => {
  const settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 4000,
  };

  const ref = useRef<Slider>(null);

  const handleNextSlide = () => {
    ref.current?.slickNext();
  };

  const handlePrevSlide = () => {
    ref.current?.slickPrev();
  };

  return (
    <div className="slider-container">
      <button
        onClick={handlePrevSlide}
        className="button-arrow slider__button"
        type="button"
      >
        <span className="icon icon--arrow icon--back" />
      </button>
      <div className="slider">
        <Slider ref={ref} {...settings}>
          <div className="slider__image-container">
            <div
              className="slide slide-1"
            />
          </div>
          <div className="slider__image-container">
            <div
              className="slide slide-2"
            />
          </div>
          <div className="slider__image-container">
            <div
              className="slide slide-3"
            />
          </div>
        </Slider>
      </div>
      <button
        onClick={handleNextSlide}
        className="button-arrow slider__button"
        type="button"
      >
        <span className="icon icon--arrow icon--next" />
      </button>
    </div>
  );
};
