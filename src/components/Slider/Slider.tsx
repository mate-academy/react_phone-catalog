import React, { useState, useEffect } from 'react';
import './Slider.scss';

interface Slide {
  id: number;
  imageUrl: string;
}

interface SliderProps {
  slides: Slide[];
}

const Slider: React.FC<SliderProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  });

  return (
    <div className="slider">
      <button
        className="slider__control slider__control--prev"
        onClick={prevSlide}
      ></button>

      <div className="slider__container">
        {slides.map((slide, i) => (
          <img
            key={slide.id}
            src={slide.imageUrl}
            alt={`Slide ${slide.id}`}
            className={`slider__image ${
              i === currentSlide
                ? 'active'
                : i === (currentSlide + 1) % slides.length
                  ? 'next'
                  : 'prev'
            }`}
          />
        ))}
      </div>

      <button
        className="slider__control slider__control--next"
        onClick={nextSlide}
      ></button>

      <div className="slider__track">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slider__indicator ${index === currentSlide ? 'slider__indicator--active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
