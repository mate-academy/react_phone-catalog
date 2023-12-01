import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Slider.scss';

interface Slide {
  image: string;
  title: string;
}

interface SliderProps {
  slides: Slide[];
}

export const Slider: React.FC<SliderProps> = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    { image: '/image/banner-phones.png' },
    { image: '/image/banner-tablets.png' },
    { image: '/image/banner-accessories.png' },
  ];

  const settings = {
    infiniteLoop: true,
    showArrows: false,
    showStatus: false,
    showIndicators: false,
    showThumbs: false,
    transitionTime: 500,
    interval: 3000,
    autoPlay: true,
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % slides.length);
  };

  const renderCustomIndicators = () => {
    return slides.map((_slides, index) => (
      <div
        key={index}
        className={`custom-indicator ${currentIndex === index ? 'active' : ''}`}
        onClick={() => setCurrentIndex(index)}
      />
    ));
  };

  return (

    <div className="slider-container">
      <Carousel
        className="carousel"
        {...settings}
        selectedItem={currentIndex}
        onChange={(index) => setCurrentIndex(index)}
      >
        {slides.map((slide, index) => (
          <div key={index}>

            <img
              src={slide.image}
              alt="slide"
              className="slider-image"
            />
          </div>
        ))}
      </Carousel>

      <div className="indicators-container">
        <button
          className="slider_arrows-left"
          onClick={handlePrev}
        />

        <button
          className="slider_arrows-right"
          onClick={handleNext}
        />

        {renderCustomIndicators()}
      </div>
    </div>
  );
};
