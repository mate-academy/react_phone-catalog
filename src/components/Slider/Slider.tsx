import React, { useCallback, useEffect, useState } from 'react';
import './Slider.scss';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import { IMAGE_ROOT } from '../../helpers/utils/constants/imageRoot';

const Slider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    'banner-phones.png',
    'banner-accessories.png',
    'banner-tablets.png',
  ];

  const links = [
    '/phones',
    '/accessories',
    '/tablets',
  ];

  const totalSlides = slides.length;

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextSlide();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentSlide, handleNextSlide]);

  return (
    <div className="slider margin-top-40-px">
      <div className="slider__container">
        {/* eslint-disable-next-line */}
        <button
          className="slider__button slider__button--left"
          onClick={handlePrevSlide}
        />
        <div className="slider__wrapper">
          <ul className="slider__list" style={{ transform: `translateX(${-currentSlide * 100}%)` }}>
            {slides.map((slide, index) => (
              <li key={links[index]} className={`slider__slide ${index === currentSlide ? 'active' : ''}`}>
                <Link to={links[currentSlide]}>
                  <img src={`${IMAGE_ROOT}${slide}`} alt={`Slide ${index + 1}`} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* eslint-disable-next-line */}
        <button
          className="slider__button slider__button--right"
          onClick={handleNextSlide}
        />
      </div>
      <div className="slider__numeration">
        {slides.map((slide, index) => (
          <div
            key={slide}
            className={cn('slider__numeration-item', {
              'slider__numeration-item--active': index === currentSlide,
            })}
          >
            <></>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
