import React, { useState, useEffect, useRef } from 'react';
import './PicturesSlider.scss';

export const PicturesSlider: React.FC = () => {
  const images = [
    '/img/banner-phones.png',
    '/img/banner-accessories.png',
    '/img/banner-tablets.png',
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % images.length);
  };

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(nextSlide, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(nextSlide, 5000);
  };

  return (
    <div className="picturesSlider">
      <div className="picturesSlider__container">
        <button
          className="
            picturesSlider__button picturesSlider__button--left"
        ></button>

        <div className="picturesSlider__container-image">
          <img
            src={images[currentSlide]}
            alt="Slide"
            className="picturesSlider__image"
          />
        </div>

        <button
          className="
            picturesSlider__button picturesSlider__button--right"
        ></button>
      </div>

      <div className="picturesSlider__dots">
        {images.map((_, index) => (
          <div
            key={index}
            className={`picturesSlider__dot ${currentSlide === index ? 'picturesSlider__dot--active' : ''}`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};
