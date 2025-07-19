/* eslint react-refresh/only-export-components: off */
import { useEffect, useState } from 'react';
import './Slide.scss';
import React from 'react';

export const images = [
  './img/banner-phones.png',
  './img/banner-tablets.png',
  './img/banner-accessories.png',
];

export const Slideshow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleSwipe = (e: React.TouchEvent) => {
    const touchStart = e.changedTouches[0].clientX;
    const touchEnd = e.changedTouches[e.changedTouches.length - 1].clientX;

    if (touchStart - touchEnd > 50) {
      handleNext();
    } else if (touchStart - touchEnd < -50) {
      handlePrev();
    }
  };

  return (
    <div className="slider-wrapper">
      <button
        onClick={handlePrev}
        className="arrow left"
      >
        &#10094;
      </button>

      <div
        className="slideshow"
        onTouchStart={handleSwipe}
      >
        <div className="slider-container">
          <div
            className="slider-track"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Slide ${index + 1}`}
                className="slide-image"
              />
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleNext}
        className="arrow right"
      >
        &#10095;
      </button>

      <div className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
