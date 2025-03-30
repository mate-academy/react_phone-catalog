import { useEffect, useState } from 'react';
import './MainSlider.scss';
import { Link } from 'react-router-dom';

export const MainSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    { link: 'phones/apple-iphone-16-pro-max-256gb-blacktitanium', path: './img/main-banners/banner-main.png' },
    { link: 'phones', path: './img/main-banners/banner-phones.png' },
    { link: 'tablets', path: './img/main-banners/banner-tablets.png' },
    { link: 'accessories', path: './img/main-banners/banner-accessories.png' },
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

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex(prev => (prev + 1) % slides.length);
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="slider">
      <div className="slider__box">
        <ul
          className="slider__track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <li key={index}>
              <Link to={`/${slide.link}`}>
                <img
                  src={slide.path}
                  className="slider__image"
                  alt={`Slide ${index + 1}`}
                />
              </Link>
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
