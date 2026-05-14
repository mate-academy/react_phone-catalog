import React, { useState, useEffect } from 'react';
import './Banner.scss';

const BASE_URL =
  window.location.hostname === 'localhost' ? '' : '/react_phone-catalog';

const images = [
  `${BASE_URL}/img/banner-iphone.svg`,
  `${BASE_URL}/img/banner-tablets.png`,
  `${BASE_URL}/img/banner-accessories.png`,
];

const firstBannerMobile = `${BASE_URL}/img/banner-iphone-mobile.svg`;

export const Banner: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setIndex(prev => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex(prev => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="banner">
      <div className="banner__main">
        <button
          type="button"
          className="banner__btn banner__btn--prev"
          onClick={prevSlide}
        >
          <span className="banner__arrow" />
        </button>

        <div className="banner__viewer">
          <div
            className="banner__list"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {images.map((img, i) => (
              <div key={img} className="banner__slide">
                {i === 0 ? (
                  <picture>
                    <source media="(min-width: 640px)" srcSet={img} />
                    <img
                      src={firstBannerMobile}
                      alt="Promo"
                      className="banner__img"
                    />
                  </picture>
                ) : (
                  <img src={img} alt="Promo" className="banner__img" />
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="banner__btn banner__btn--next"
          onClick={nextSlide}
        >
          <span className="banner__arrow" />
        </button>
      </div>

      <div className="banner__dots">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`banner__dot ${i === index ? 'is-active' : ''}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};
