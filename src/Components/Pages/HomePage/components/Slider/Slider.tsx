/* eslint-disable react/no-array-index-key */
import './Slider.scss';
import { useState } from 'react';
import FirstImage from './SliderImage/1.png';
import TwoImage from './SliderImage/2.jpg';
import ThridImage from './SliderImage/3.jpg';

export const Slider = () => {
  const images = [
    FirstImage,
    TwoImage,
    ThridImage,
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const currentImage = images[currentSlide];

  return (
    <>
      <div className="slider">
        <div className="block-for-border">
          <button className="slider__control" type="button" onClick={prevSlide}>
            &lt;
          </button>
        </div>

        <img className="slider__image" src={currentImage} alt="" />

        <div className="block-for-border">
          <button className="slider__control" type="button" onClick={nextSlide}>
            &gt;
          </button>
        </div>
      </div>

      <div className="slider__indicators">
        {images.map((_, index) => (
          <div
            key={index}
            className={`slider__indicator ${index === currentSlide ? 'active' : ''}`}
          />
        ))}
      </div>
    </>
  );
};
