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

  return (
    <div className="slideshow">
      <button onClick={handlePrev}>&#10094;</button>
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="img"
      />
      <button onClick={handleNext}>&#10095;</button>
    </div>
  );
};
