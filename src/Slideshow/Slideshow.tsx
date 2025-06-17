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
    }, 3500);

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
  //eslint-disable-next-line
  console.log('Current slide:', images[currentIndex]);

  // Handle swipe gesture
  const handleSwipe = (e: React.TouchEvent) => {
    const touchStart = e.changedTouches[0].clientX;
    const touchEnd = e.changedTouches[e.changedTouches.length - 1].clientX;

    if (touchStart - touchEnd > 50) {
      handleNext(); // Swipe Left (Next)
    } else if (touchStart - touchEnd < -50) {
      handlePrev(); // Swipe Right (Previous)
    }
  };

  return (
    <div className="slider-wrapper">
      <div
        className="slideshow"
        onTouchStart={handleSwipe}
      >
        <button
          onClick={handlePrev}
          className="arrow left"
        >
          &#10094;
        </button>

        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="img"
        />

        <button
          onClick={handleNext}
          className="arrow right"
        >
          &#10095;
        </button>
      </div>

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
