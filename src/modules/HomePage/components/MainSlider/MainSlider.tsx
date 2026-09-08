import { useEffect, useState } from 'react';
import './MainSlider.scss';
import { Link } from 'react-router-dom';
import { mobileSlides, desktopSlides } from '../../../../constants/common';
import { useSwipe } from '../../../../utils/swipeCallbacks';

export const MainSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 639);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 639);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slides = isMobile ? mobileSlides : desktopSlides;

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

  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe({
    onSwipeLeft: nextSlide,
    onSwipeRight: prevSlide,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider">
      <div
        className="slider__box"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
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

      {!isMobile && (
        <>
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
        </>
      )}

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
