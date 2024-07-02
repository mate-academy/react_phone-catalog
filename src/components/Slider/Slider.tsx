import React, { useState, useEffect } from 'react';
import './Slider.scss';
import useTouchSlider from '../../hooks/useTouchSlider';

interface Slide {
  id: number;
  imageUrl: string;
}

interface SliderProps {
  slides: Slide[];
  settings: { autoplay: boolean };
}

const Slider: React.FC<SliderProps> = ({ slides, settings }) => {
  const { autoplay } = settings;
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(() => nextSlide(), 3000);

      return () => clearInterval(interval);
    } else {
      return;
    }
  });

  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useTouchSlider({
    onPrevSlide: prevSlide,
    onNextSlide: nextSlide,
  });

  return (
    <div
      className="slider"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
    >
      <button
        className="slider__control slider__control--prev"
        onClick={prevSlide}
      ></button>

      <div className="slider__container">
        {slides.map((slide, index) => {
          let slideClass = '';

          if (index === currentSlide) {
            slideClass = 'active';
          } else if (
            index ===
            (currentSlide - 1 + slides.length) % slides.length
          ) {
            slideClass = 'prev';
          } else if (index === (currentSlide + 1) % slides.length) {
            slideClass = 'next';
          }

          return (
            <div key={slide.id}>
              <img
                src={slide.imageUrl}
                alt={`Slide ${slide.id}`}
                className={`slider__image ${slideClass}`}
              />
            </div>
          );
        })}
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
