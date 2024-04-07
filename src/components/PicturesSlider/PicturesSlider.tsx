import { useEffect, useState } from 'react';
import './PicturesSlider.scss';

export const slides = [
  '/img/slide-1.png',
  '/img/slide-2.png',
  '/img/slide-3.png',
];

export const PicturesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex(oldIndex => (oldIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(oldIndex => (oldIndex - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pictures-slider pictures-slider--margin-top">
      <div className="pictures-slider__content">
        <button className="pictures-slider__btn" onClick={prevSlide}>
          <img src="img/icons/left.svg" alt="left arrow" />
        </button>
        <div className="pictures-slider__image">
          <img src={slides[currentIndex]} alt="slider image" />
        </div>
        <button className="pictures-slider__btn" onClick={nextSlide}>
          <img src="img/icons/right.svg" alt="right arrow" />
        </button>
      </div>
      <div className="pictures-slider__indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`pictures-slider__indicator ${currentIndex === index ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};
