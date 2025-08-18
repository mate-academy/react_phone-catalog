import React, { useEffect, useState } from 'react';
import './Banner.scss';

const images = [
  '/img/banner-desktop-1.jpg',
  '/img/banner-desktop-2.jpg',
  '/img/banner-desktop-3.jpg',
];

export const Banner: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setIndex(prev => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setIndex(prev => (prev + 1) % images.length);
  };

  return (
    <div className="banner">
      <button className="banner__button" onClick={prevSlide}>
        <img
          className="banner__arrow"
          src="/img/icons/arrow-left.svg"
          alt="arrow left"
        />
      </button>

      <div className="banner__wrapper">
        <img className="banner__image" src={images[index]} alt="banner image" />
      </div>

      <button className="banner__button" onClick={nextSlide}>
        <img
          className="banner__arrow"
          src="/img/icons/arrow-right.svg"
          alt="arrow right"
        />
      </button>
      {/* <div className="banner__container">
        <h1>Now available in our store!</h1>
        <p>Be the first!</p>
        <button>ORDER NOW</button>
      </div> */}
    </div>
  );
};
