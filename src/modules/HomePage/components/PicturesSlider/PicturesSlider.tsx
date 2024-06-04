import { useCallback, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import s from './PicturesSlider.module.css';

const slides = [
  { url: 'img/banner-phones.png', id: 1, path: 'phones' },
  { url: 'img/banner-tablets.png', id: 2, path: 'tablets' },
  { url: 'img/banner-accessories.png', id: 3, path: 'accessories' },
];

const PicturesSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide(prevSlide =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1,
    );
  };

  useEffect(() => {
    const intervalId = setInterval(handleNextSlide, 5000);

    return () => clearInterval(intervalId);
  }, [handleNextSlide]);

  return (
    <>
      <div className={s.sliderContainer}>
        <button className={s.btn} onClick={handlePrevSlide}>
          <img src="img/icons/arrow-left-dark-icon.svg" alt="Previous Slide" />
        </button>
        <div className={s.slider}>
          <div className={s.sliders}>
            {slides.map((slide, index) => (
              <Link
                to={slides[currentSlide].path}
                key={slide.id}
                className={`${s.slide} ${index === currentSlide ? s.activeSlide : ''}`}
              >
                <img src={slide.url} alt={`Slide ${index + 1}`} />
              </Link>
            ))}
          </div>
        </div>
        <button className={s.btn} onClick={handleNextSlide}>
          <img src="img/icons/arrow-right-dark-icon.svg" alt="Next Slide" />
        </button>
      </div>

      <div className={s.dots}>
        {slides.map((slide, index) => (
          <div
            className={`${s.dot} ${index === currentSlide ? s.activeDot : ''}`}
            key={slide.id}
            onClick={() => setCurrentSlide(index)}
          >
            <div
              className={`${s.dash} ${index === currentSlide ? s.activeDash : ''}`}
            ></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PicturesSlider;
