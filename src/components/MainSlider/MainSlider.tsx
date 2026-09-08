import './MainSlider.module.scss';
import React, { useEffect, useState, useRef } from 'react';
import Chevron from '../../../public/img/icons/Chevron (Arrow Right).svg';

const images = [
  '/img/MainSlider/Banner.png',
  '/img/MainSlider/Banner2.png',
  '/img/MainSlider/Banner3.jpg',
];

export const MainSlider = () => {
  const [currentImg, setCurrentImg] = useState(0);
  const startXPoint = useRef(0);
  const endXPoint = useRef(0);

  const nextSlide = () => {
    setCurrentImg(prevIndex => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentImg(prevIndex => (prevIndex - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImg(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startXPoint.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    endXPoint.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = endXPoint.current - startXPoint.current;

    if (distance > 50) {
      prevSlide();
    }

    if (distance < -50) {
      nextSlide();
    }
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);

    return () => clearInterval(interval);
  }, [currentImg]);

  return (
    <>
      <div className="main-slider">
        <h1 className="home_title">Welcome to Nice Gadgets store!</h1>

        <div
          className="main-slider_wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            className="main-slider_btn main-slider_btn--prev"
            onClick={() => prevSlide()}
          >
            <img src={Chevron} alt="chevron" />
          </button>

          <img
            className={`main-slider_slide ${images[currentImg] ? 'main-slider_slide' : ''}`}
            src={`/react_phone-catalog/${images[currentImg]}`}
            alt="slide"
          />

          <button
            className="main-slider_btn main-slider_btn--next"
            onClick={() => nextSlide()}
          >
            <img src={Chevron} alt="chevron" />
          </button>
        </div>
        <div className="main-slider_dots">
          {images.map((_, index) => (
            <span
              onClick={() => goToImage(index)}
              key={index}
              className={
                index === currentImg
                  ? 'main-slider_dot main-slider_dot--active'
                  : 'main-slider_dot'
              }
            ></span>
          ))}
        </div>
      </div>
    </>
  );
};
