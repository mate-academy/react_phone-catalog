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

  const prevSlide = () =>
    setIndex(prev => (prev - 1 + images.length) % images.length);
  const nextSlide = () => setIndex(prev => (prev + 1) % images.length);

  return (
    <div className="banner">
      <button
        className="banner__button banner__button--left"
        onClick={prevSlide}
      >
        <img src="/img/icons/arrow-left.svg" alt="arrow left" />
      </button>

      <div className="banner__wrapper">
        {images.map((img, i) => (
          <img
            key={img}
            src={img}
            alt="banner image"
            className={`banner__image ${i === index ? 'active' : ''} ${
              i === images.length - 1 ? 'last' : ''
            }`}
          />
        ))}
      </div>

      <button
        className="banner__button banner__button--right"
        onClick={nextSlide}
      >
        <img src="/img/icons/arrow-right.svg" alt="arrow right" />
      </button>

      <div className="banner__dots">
        {images.map((_, i) => (
          <span
            key={i}
            className={`banner__dot ${i === index ? 'active' : ''}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};
