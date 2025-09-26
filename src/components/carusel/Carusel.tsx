import React, { useState, useEffect } from 'react';
import './Carusel.scss';

const images = [
  '/img/carusel/desktop-banner-2.png',
  '/img/banner-phones.png',
  '/img/carusel/desktop-banner-3.png',
];

const imagesMini = [
  '/img/carusel/mini-1.png',
  '/img/carusel/mini-2.png',
  '/img/carusel/mini-3.png',
];

interface Props {
  duration?: number;
}

export const Carusel: React.FC<Props> = ({ duration = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  const nextSlide = () => setCurrentIndex(prev => (prev + 1) % images.length);

  useEffect(() => {
    if (duration) {
      const interval = setInterval(nextSlide, duration);
      return () => clearInterval(interval);
    }
  }, [duration]);

  return (
    <div className="carusel">
      <div className="carusel__content">
        <button className="carusel__bttn carusel__bttn--prev" onClick={prevSlide}>
          <img src="/img/left.png" alt="leftBtn" />
        </button>

        <div className="carusel__imgs">
          <picture>
            <source media="(max-width: 639px)" srcSet={imagesMini[currentIndex]} />
            <img
              src={images[currentIndex]}
              alt={`slide-${currentIndex}`}
              className="carusel__img"
            />
          </picture>
        </div>

        <button className="carusel__bttn carusel__bttn--next" onClick={nextSlide}>
          <img src="/img/right.png" alt="rightBtn" />
        </button>
      </div>

      <div className="carusel__slider">
        <div
          className={`${currentIndex === 0 ? `carusel__slide` : 'carusel__slide--active'}`}
        ></div>
        <div
          className={`${currentIndex === 1 ? `carusel__slide` : 'carusel__slide--active'}`}
        ></div>
        <div
          className={`${currentIndex === 2 ? `carusel__slide` : 'carusel__slide--active'}`}
        ></div>
      </div>
    </div>
  );
};
