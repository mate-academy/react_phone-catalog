// Carousel.js or Carousel.tsx

import React, { useState } from 'react';
import './carousel.scss'; // Import your styling here
import ChevronLeft from './Chevron-left.svg';
import ChevronRight from './Chevron-right.svg';
import Banner from './Banner.png';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [Banner, Banner, Banner]; // Replace Banner with your image URLs

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const renderDots = () => {
    return images.map((_, index) => (
      <div
        key={index}
        className={`dot ${index === currentIndex ? 'active' : ''}`}
        onClick={() => goToSlide(index)}
      />
    ));
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <>
      <div className="carousel-container">
        <div className="button-left" onClick={goToPrev}>
          <img className="chevron" src={ChevronLeft} alt="Previous" />
        </div>
        <div className="slider-container">
          <div className="slides" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {images.map((image, index) => (
              <div key={index} className="slide">
                <img src={image} alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
        <div className="button-right" onClick={goToNext}>
          <img className="chevron" src={ChevronRight} alt="Next" />
        </div>

      </div>
      <div className="dots-container">{renderDots()}</div>
    </>
  );
};

export default Carousel;
