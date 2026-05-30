import React, { useEffect, useState } from 'react';
import style from './Banner.module.scss';
import className from 'classnames';

const images = [
  'img/banner-phones.png',
  'img/banner-accessories.png',
  'img/banner-tablets.png',
];

export const Banner: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent(prev => (prev - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrent(prev => (prev + 1) % images.length);
  };

  return (
    <div className={style.banner}>
      <button className={style.bannerBtn} onClick={prevSlide}>
        <img
          src="img/icons/Chevron (Arrow Left).svg"
          alt="arrow left"
          className={style.bannerArrow}
        />
      </button>

      <div className={style.bannerWrapper}>
        {images.map((img, i) => (
          <img
            key={img}
            src={img}
            alt="banner img"
            className={className(style.bannerImg, {
              [style.bannerImgActive]: i === current,
              [style.bannerImgLast]: i === images.length - 1,
            })}
          />
        ))}
      </div>

      <button className={style.bannerBtn} onClick={nextSlide}>
        <img
          src="img/icons/Chevron (Arrow Right).svg"
          alt="arrow right"
          className={style.bannerArrow}
        />
      </button>

      <div className={style.bannerDots}>
        {images.map((_, i) => (
          <span
            key={i}
            className={className(style.bannerDot, {
              [style.bannerDotActive]: i === current,
            })}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
};
