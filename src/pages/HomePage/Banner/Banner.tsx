import './Banner.scss';
import '../../../utils/main.scss';
import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import classNames from 'classnames';

export const Banner = () => {
  const slides = [
    {
      image:
        'https://mate-academy.github.io/react_phone-catalog/_new/img/banner-phones.png',
    },
    {
      image:
        'https://mate-academy.github.io/react_phone-catalog/_new/img/banner-tablets.png',
    },
    {
      image:
        'https://mate-academy.github.io/react_phone-catalog/_new/img/banner-accessories.png',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % slides.length);
  };

  const settings = {
    // infiniteLoop: true,
    showArrows: false,
    showStatus: false,
    showIndicators: false,
    showThumbs: false,
    transitionTime: 500,
    interval: 3000,
    autoPlay: true,
  };

  return (
    <div className="banner grid--tablet grid--desktop">
      <h1
        className="banner__title 
        grid__item--tablet-1-9
        grid__item--desktop-1-19"
      >
        Welcome to Nice Gadgets store!
      </h1>
      <button
        className="banner__button banner__left
        grid__item--tablet-1
        grid__item--desktop-1"
        type="button"
        onClick={handlePrev}
      ></button>
      <div
        className="banner__box
        grid__item--tablet-2-11
        grid__item--desktop-2-23"
      >
        <Carousel
          className="banner__carousel"
          {...settings}
          selectedItem={currentIndex}
          onChange={index => setCurrentIndex(index)}
        >
          {slides.map(slide => (
            <div key={slide.image}>
              <img
                src={slide.image}
                alt="slide"
                className="banner__slider-image"
              />
            </div>
          ))}
        </Carousel>
      </div>
      <button
        className="banner__button banner__right
            grid__item--tablet-12
            grid__item--desktop-24"
        type="button"
        onClick={handleNext}
      ></button>

      <div
        className="banner__rectangle
        grid__item--tablet-6-7
        grid__item--desktop-13-14"
      >
        <div
          className={classNames('banner__rectangle__img', {
            'banner__rectangle__img--active': currentIndex === 0,
          })}
        ></div>
        <div
          className={classNames('banner__rectangle__img', {
            'banner__rectangle__img--active': currentIndex === 1,
          })}
        ></div>
        <div
          className={classNames('banner__rectangle__img', {
            'banner__rectangle__img--active': currentIndex === 2,
          })}
        ></div>
      </div>
    </div>
  );
};
