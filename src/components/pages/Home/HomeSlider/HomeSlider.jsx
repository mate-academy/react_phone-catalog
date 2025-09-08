import { useState, useEffect, useRef, useCallback } from 'react';
import './HomeSlider.scss';

const images = [
  `./images/banner/Banner__1.png`,
  `./images/banner/Banner__2.png`,
  `./images/banner/Banner__6.png`,
  `./images/banner/Banner_2.png`,
];

const extendedImages = [images[images.length - 1], ...images, images[0]];

export const HomeSlider = () => {
  const [current, setCurrent] = useState(1);
  const [transitioning, setTransitioning] = useState(true);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);
  const [slideHeight, setSlideHeight] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = useCallback(() => {
    setCurrent(prev => prev + 1);
    setTransitioning(true);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent(prev => prev - 1);
    setTransitioning(true);
  }, []);

  const startAutoSlide = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent(prev => prev + 1);
      setTransitioning(true);
    }, 5000);
  }, []);

  const goToSlide = useCallback(
    index => {
      setCurrent(index + 1);
      setTransitioning(true);
      startAutoSlide();
    },
    [startAutoSlide],
  );

  const handleTransitionEnd = () => {
    if (current === 0) {
      setTransitioning(false);
      setCurrent(images.length);
    }

    if (current === images.length + 1) {
      setTransitioning(false);
      setCurrent(1);
    }
  };

  // Обробники свайпу
  const handleTouchStart = e => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = e => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50;

    if (diff > swipeThreshold) {
      nextSlide();
    } else if (diff < -swipeThreshold) {
      prevSlide();
    }

    startAutoSlide();
  };

  useEffect(() => {
    const sliderTrackEl = sliderRef.current;

    if (sliderTrackEl) {
      const slide = sliderTrackEl.querySelector('.image-slide');

      if (slide) {
        setSlideHeight(slide.clientHeight);
      }
    }

    const handleResize = () => {
      const sliderTrackElResize = sliderRef.current;

      if (sliderTrackElResize) {
        const slide = sliderTrackElResize.querySelector('.image-slide');

        if (slide) {
          setSlideHeight(slide.clientHeight);
        }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [current]);

  useEffect(() => {
    startAutoSlide();

    return () => clearInterval(intervalRef.current);
  }, [startAutoSlide]);

  return (
    <section className="slider-wrapper-container">
      <h1 className="title">Welcome to Nice Gadgets store!</h1>

      <div className="slider-wrapper">
        <button
          className="nav-button prev"
          onClick={prevSlide}
          style={{ height: slideHeight ? `${slideHeight}px` : 'auto' }}
        >
          <img
            src={`./images/icons/Chevron_Arrow_Left.svg`}
            className="icons_arrow"
            alt="Chevron Left"
          />
        </button>

        <div
          className="slider-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="slider-track"
            ref={sliderRef}
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: `translateX(-${
                current * (100 / extendedImages.length)
              }%)`,
              transition: transitioning ? 'transform 0.5s ease-in-out' : 'none',
              width: `${extendedImages.length * 100}%`,
            }}
          >
            {extendedImages.map((img, index) => (
              <div
                key={index}
                className="image-slide"
                style={{ width: `${100 / extendedImages.length}%` }}
              >
                <img src={img} alt={`Slide ${index}`} />
              </div>
            ))}
          </div>
        </div>

        <button
          className="nav-button next"
          onClick={nextSlide}
          style={{ height: slideHeight ? `${slideHeight}px` : 'auto' }}
        >
          <img
            src={`./images/icons/Chevron_Arrow_Right.svg`}
            className="icons_arrow"
            alt="Chevron Right"
          />
        </button>
      </div>

      <div className="slider-dots">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            className={`slider-dot ${current === index + 1 ? 'active' : ''}`}
          ></div>
        ))}
      </div>
    </section>
  );
};
