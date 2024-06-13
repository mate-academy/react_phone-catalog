import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Link } from 'react-router-dom';
import s from './PicturesSlider.module.css';
import useDarkThemeStore from '../../../../store/darkThemeStore';

const PicturesSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const { theme } = useDarkThemeStore();

  const slides = [
    {
      url: `img/${theme === 'dark' ? 'mainSliderImg/Iphone_dark.png' : 'mainSliderImg/Iphone_light.png'}`,
      urlMobile: `img/${theme === 'dark' ? 'mainSliderImg/Iphone_dark_mobile.png' : 'mainSliderImg/Iphone_light_mobile.png'}`,
      id: 1,
      path: 'phones',
    },
    {
      url: `img/${theme === 'dark' ? 'mainSliderImg/Tablets_dark.png' : 'mainSliderImg/Tablets_light.png'}`,
      urlMobile: `img/${theme === 'dark' ? 'mainSliderImg/Tablets_dark_mobile.png' : 'mainSliderImg/Tablets_light_mobile.png'}`,
      id: 2,
      path: 'tablets',
    },
    {
      url: `img/${theme === 'dark' ? 'mainSliderImg/Accessories_dark.png' : 'mainSliderImg/Accessories_light.png'}`,
      urlMobile: `img/${theme === 'dark' ? 'mainSliderImg/Accessories_dark_mobile.png' : 'mainSliderImg/Accessories_light_mobile.png'}`,
      id: 3,
      path: 'accessories',
    },
  ];

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
  }, [slides.length]);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(prevSlide =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1,
    );
  }, [slides.length]);

  useEffect(() => {
    const intervalId = setInterval(handleNextSlide, 10000);

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
                <picture>
                  <source media="(min-width:639px)" srcSet={slide.url}></source>
                  <img src={slide.urlMobile} alt={`Slide ${index + 1}`} />
                </picture>
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
