import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Link } from 'react-router-dom';
import s from './PicturesSlider.module.css';

const slides = [
  { url: 'img/banner-phones.png', id: 1, path: 'phones' },
  { url: 'img/banner-tablets.png', id: 2, path: 'tablets' },
  { url: 'img/banner-accessories.png', id: 3, path: 'accessories' },
];

const PicturesSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(prevSlide =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1,
    );
  }, []);

  useEffect(() => {
    const intervalId = setInterval(handleNextSlide, 5000);

    return () => clearInterval(intervalId);
  }, [handleNextSlide]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNextSlide();
    }

    if (touchStartX.current - touchEndX.current < -50) {
      handlePrevSlide();
    }
  };

  return (
    <>
      <div
        className={s.sliderContainer}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button className={s.btn} onClick={handlePrevSlide}>
          <GoChevronLeft size={16} />
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
          <GoChevronRight size={16} />
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
