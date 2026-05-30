import { useEffect, useRef, useState } from 'react';
import './BannerSlider.scss';
import { Slide } from './Slide';
import { useSlides } from '../../../hooks/useSlides';
import themeStyles from '../../../styles/utils/themeStyles';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import useMediaQuery from '../../../hooks/useMediaQuery';
import { ScreenSize } from '../../../types/screenSize';
import { useSwipe } from '../../../hooks/useSwipe';

export const BannerSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSliding, setIsSliding] = useState(true);
  const slides = useSlides();
  const slideRef = useRef(currentSlide);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentTheme = useSelector(
    (state: RootState) => state.currentTheme.theme,
  );
  const isMobile = useMediaQuery(ScreenSize.Mobile);
  const { arrow, sliderDot, sliderDotActive } = themeStyles(
    currentTheme === 'light-theme',
  );

  const handlePrevSlide = () => {
    setCurrentSlide(curr => (curr === 0 ? slides.length - 1 : curr - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide(curr => (curr === slides.length - 1 ? 0 : curr + 1));
  };

  // Handles the click or swipe for slide.
  // It executes the provided slide change function, pauses automatic sliding for 4 seconds,
  // and then resumes sliding afterward.
  const handleMoveSlide = (slideHandler: () => void) => {
    slideHandler();
    setIsSliding(false);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsSliding(true);
    }, 4000);
  };

  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe(
    () => handleMoveSlide(() => handlePrevSlide()),
    () => handleMoveSlide(() => handleNextSlide()),
  );

  // Update slideRef with the current slide index to ensure the latest slide index is available
  // when the interval function runs, without creating a new interval on each render.
  useEffect(() => {
    slideRef.current = currentSlide;
  }, [currentSlide]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isSliding) {
        setCurrentSlide(
          slideRef.current === slides.length - 1 ? 0 : slideRef.current + 1,
        );
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length, isSliding]);

  return (
    <div className="carousel">
      <div className="carousel__container">
        <div
          className="carousel__viewport"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="carousel__wrapper"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map(slide => (
              <Slide
                key={slide.id}
                imgUrl={
                  slide.urlMobile && isMobile ? slide.urlMobile : slide.url
                }
                category={slide.category}
                productId={slide.productId}
                alt={slide.alt}
              />
            ))}
          </div>
        </div>

        {!isMobile && (
          <>
            <button
              onClick={() => handleMoveSlide(handlePrevSlide)}
              className="carousel__arrow carousel__arrow--left icon-left"
            >
              <img src={arrow} alt="Arrow left" />
            </button>
            <button
              onClick={() => handleMoveSlide(handleNextSlide)}
              className="carousel__arrow carousel__arrow--right"
            >
              <img src={arrow} alt="Arrow right" />
            </button>
          </>
        )}

        <div className="carousel__switch">
          {slides.map(slide => (
            <div
              key={slide.id}
              onClick={() => handleMoveSlide(() => setCurrentSlide(slide.id))}
              className="dot"
            >
              <img
                src={currentSlide === slide.id ? sliderDotActive : sliderDot}
                alt="carousel dot"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
