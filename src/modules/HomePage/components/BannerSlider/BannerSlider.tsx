import './BannerSlider.scss';
import React from 'react';

export const BannerSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const images = [
    'img/imageSlider/Banner 01.png',
    'img/imageSlider/Banner 02.png',
    'img/imageSlider/Banner 03.png',
  ];

  let touchStart = 0;
  let touchEnd = 0;

  const nextSlide = () => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
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
            {images.map(image => {
              return (
                <img
                  key={image}
                  src={image}
                  alt="Main Banner"
                  className="slider__image"
                />
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
        {images.map((_, index) => (
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
