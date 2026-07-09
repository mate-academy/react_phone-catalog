import { useEffect, useState } from 'react';
import './PictureSlider.scss';
import slide1 from '../../items/small-banner.png';
import slide2 from '../../items/iphone17.jpg';
import slide3 from '../../items/applewatch.jpg';
import arrowLeft from '../../items/vector_left.png';
import arrowRight from '../../items/vector_right.png';

const slides = [slide1, slide2, slide3];

export const PictureSlider = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent(prev => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent(prev => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="slider">
      <h2 className="welcome">Welcome to Nice Gadgets store!</h2>
      <div className="slider__content">
        {/* Кнопка Вліво - з'явиться тільки на 640px+ */}
        <button className="slider__btn slider__btn--left" onClick={prevSlide}>
          <img src={arrowLeft} alt="Prev" />
        </button>

        <div className="slider__window">
          <div
            className="slider__track"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((src, index) => (
              <img
                key={index}
                className="slider__image"
                src={src}
                alt={`slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Кнопка Вправо - з'явиться тільки на 640px+ */}
        <button className="slider__btn slider__btn--right" onClick={nextSlide}>
          <img src={arrowRight} alt="Next" />
        </button>
      </div>

      <div className="slider__dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`slider__dot ${index === current ? 'slider__dot--active' : ''}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
};
