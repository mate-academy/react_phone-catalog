import { Link } from 'react-router-dom';
import './BannerSlider.scss';
import React from 'react';

export const BannerSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const sliderObj = [
    {
      link: 'phones/apple-iphone-11-pro-max-256gb-midnightgreen',
      img: 'img/imageSlider/Banner 01.png',
    },
    {
      link: 'tablets/apple-ipad-pro-11-2021-128gb-spacegray',
      img: 'img/imageSlider/Banner 02.png',
    },
    {
      link: 'accessories/apple-watch-series-5-44mm-silver',
      img: 'img/imageSlider/Banner 03.png',
    },
  ];

  let touchStart = 0;
  let touchEnd = 0;

  const nextSlide = () => {
    setCurrentIndex(prev => (prev === sliderObj.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? sliderObj.length - 1 : prev - 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEnd = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextSlide();
    }

    if (touchStart - touchEnd < -50) {
      prevSlide();
    }
  };

  return (
    <section className="slider">
      <div className="slider__container">
        <button
          className="slider__button slider__button--left"
          aria-label="Previous slide"
          onClick={prevSlide}
        />

        <div
          className="slider__window"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="slider__images"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: 'transform 0.5s ease-in-out',
              display: 'flex',
            }}
          >
            {sliderObj.map(obj => {
              return (
                <Link key={obj.img} className="slider__slide" to={obj.link}>
                  <img
                    className="slider__image"
                    key={obj.img}
                    src={obj.img}
                    alt="Main Banner"
                  />
                </Link>
              );
            })}
          </div>
        </div>
        <button
          className="slider__button slider__button--right"
          aria-label="Next slide"
          onClick={nextSlide}
        />
      </div>
      <div className="slider__dots">
        {sliderObj.map((_, index) => (
          <button
            key={index}
            className={`slider__dot ${currentIndex === index ? 'slider__dot--active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};
