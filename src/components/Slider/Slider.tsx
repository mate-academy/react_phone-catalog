import React, { useState } from 'react';
import './Slider.scss';
import { IMAGE_ROOT } from '../../helpers/utils/constants/imageRoot';

const Slider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    'banner-phones.png',
    'banner-accessories.png',
    'banner-tablets.png',
  ];

  const totalSlides = slides.length;

  const nextSlide = () => {
    setCurrentSlide((prevState) => (prevState + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prevState) => (prevState - 1 + totalSlides) % totalSlides);
  };

  // TODO slider work bad
  return (
    <div className="slider-container">
      <div className="slider">
        {/* eslint-disable */}
        <button
          className="slider__button slider__button--left"
          onClick={prevSlide}
        />
        <ul className="slider__container">
          <li className="slider__slide">
            <img src={IMAGE_ROOT + slides[currentSlide]} alt={`slide ${currentSlide}`} />
          </li>
        </ul>
        <button
          className="slider__button slider__button--right"
          onClick={nextSlide}
        />
        {/* eslint-enable */}
      </div>
    </div>
  );
};

export default Slider;
