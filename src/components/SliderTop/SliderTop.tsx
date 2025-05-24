import './SliderTop.scss';
import React, { useEffect, useState } from 'react';

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const images = [
  './img/banner2.png',
  './img/banner3.jpg',
  //'/img/banner-phones.png',
  //'/img/category-accessories.png',
  './img/bg2.jpg',
  //'/img/slider-xl.png',
];

export const SliderTop: React.FC = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const displayImages = images.map((img, i) => (
    <img
      className={`slide ${activeSlideIndex === i ? 'active__slide' : ''}`}
      src={img}
      alt="slider"
      height="400px"
      key={i}
    />
  ));

  const previousSlide = () => {
    setActiveSlideIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveSlideIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    
    <>
      <p className="invitation"> Welcome to Nice Gadgets store!</p>
      <section>
        <div className="banner">
          <button className="banner-arrow arrowPrev " onClick={previousSlide}>
            <IoIosArrowBack />
          </button>

          <div className="banner__slider">{displayImages}</div>

          <button className="banner-arrow arrowNext " onClick={nextSlide}>
            <IoIosArrowForward />
          </button>
        </div>

        <div className="dots">
          {[0, 1, 2].map(index => (
            <button
              key={index}
              className={`dot ${activeSlideIndex === index ? 'active__dot' : ''}`}
              onClick={() => setActiveSlideIndex(index)}
            ></button>
          ))}
        </div>
      </section>
    </>
  );
};

export default SliderTop;
