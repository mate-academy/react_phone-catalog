import { useState } from 'react';
import './MainSlider.scss';

export const MainSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    { path: './img/main-banners/banner-accessories.png' },
    { path: './img/main-banners/banner-phones.png' },
    { path: './img/main-banners/banner-tablets.png' },
    { path: './img/main-banners/banner-accessories2.png' },
  ];

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + slides.length) % slides.length,
    );
  };

  return (
    <div className="slider">
      <div className="slider__container">
        <ul
          className="slider__track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <li key={index}>
              <img
                src={slide.path}
                className="slider__image"
                alt={`Slide ${index + 1}`}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={prevSlide}
        className="slider__button slider__button--prev"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="slider__button slider__button--next"
      >
        ❯
      </button>

      <div className="slider__pagination">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`slider__dot ${index === currentIndex ? 'slider__dot--active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};
