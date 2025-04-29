import React, { useState } from 'react';
import './Slider.scss';

interface SliderProps {
  slides: {
    id: number;
    image: string;
    title: string;
    subtitle: string;
    buttonText?: string;
    buttonLink?: string;
  }[];
}

export const Slider: React.FC<SliderProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="slider">
      <div className="slider__container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slider__slide ${index === currentSlide ? 'slider__slide--active' : ''}`}
          >
            <div className="slider__image-container">
              <img
                src={slide.image}
                alt={slide.title}
                className="slider__image"
              />
            </div>
          </div>
        ))}
      </div>

      <button className="slider__arrow slider__arrow--prev" onClick={prevSlide}>
        &lt;
      </button>

      <button className="slider__arrow slider__arrow--next" onClick={nextSlide}>
        &gt;
      </button>

      <div className="slider__dots">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            className={`slider__dot ${index === currentSlide ? 'slider__dot--active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};
