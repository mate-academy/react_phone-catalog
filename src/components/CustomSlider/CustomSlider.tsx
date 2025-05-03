import { useState, useEffect, useRef, TouchEvent } from 'react';
import './CustomSlider.scss';
import '../../../public/img/square_banner.png';

const ImageSlider = ({ slides = [], autoRotateTime = 600000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);
  const sliderRef = useRef(null);
  const touchStartXRef = useRef(null);
  const touchEndXRef = useRef(null);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    resetTimer();
  };

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    resetTimer();
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;

    setCurrentIndex(newIndex);

    resetTimer();
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      goToNext();
    }, autoRotateTime);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    console.log('Touch start detected:', e.touches[0].clientX);
    touchStartXRef.current = e.touches[0].clientX;
    resetTimer();
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    console.log('Touch move detected:', e.touches[0].clientX);
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    console.log('Touch end detected');
    if (!touchStartXRef.current || !touchEndXRef.current) {
      console.log('Touch coordinates missing');
      return;
    }

    const difference = touchStartXRef.current - touchEndXRef.current;
    console.log('Swipe distance:', difference);
    const minSwipeDistance = 50; // Minimum distance required for a swipe

    if (difference > minSwipeDistance) {
      // Swipe left, go to next slide
      console.log('Swiping left - next slide');
      goToNext();
    } else if (difference < -minSwipeDistance) {
      // Swipe right, go to previous slide
      console.log('Swiping right - previous slide');
      goToPrevious();
    }

    // Reset touch positions
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentIndex]);

  // If no slides are provided, create empty placeholder slides
  const slideContent = slides.length > 0
    ? slides
    : [
      { content: "Slide 1" },
      { content: "Slide 2" },
      { content: "Slide 3" }
    ];

  return (
    <div className='slider-wrapper'>
      <button
        className="slider__arrow slider__arrow--left"
        onClick={goToPrevious}
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <div className="slider">
        <div className="slider__container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {slideContent.map((slide, index) => (
            <div
              key={index}
              className={`slider__slide ${index === currentIndex ? 'slider__slide--active' : ''}`}
              style={{ transform: `translateX(${100 * (index - currentIndex)}%)` }}
            >
              {slide.content}
            </div>
          ))}




        </div>
      </div>
      <button
        className="slider__arrow slider__arrow--right"
        onClick={goToNext}
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
      <div className="slider__pagination">
        {slideContent.map((_, index) => (
          <button
            key={index}
            className={`slider__bullet ${index === currentIndex ? 'slider__bullet--active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>

  );
};

// Demo component with styling to match the example
const SliderDemo = () => {
  // Example slides that mimic the styling from the image
  const demoSlides = [
    {
      content: (
        <div className="slider__content-wrapper">
          <div className="slider__image-container slider__image-container--1">
          </div>
        </div>
      ),

    },
    {
      content: (
        <div className="slider__content-wrapper slider__image-container--2 slider__image-container">
          <div className="slider__text-container">
            <h2 className="slider__heading">Now available<br />in our store! 👌</h2>
            <p className="slider__subheading">Be the first!</p>
            <button className="slider__cta">ORDER NOW</button>
          </div>
          <div className="">
            <h2 className="slider__product-title">iPhone 14 Pro</h2>
            <p className="slider__product-tagline">Pro. Beyond.</p>
            <div className="slider__product-image-placeholder"></div>
          </div>
        </div>
      ),
    },
    {
      content: (
        <div className="slider__content-wrapper">
          <div className="slider__image-container slider__image-container--3">
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="slider-demo">
      <ImageSlider slides={demoSlides} />
    </div>
  );
};

/* export const SliderFull = () => {
  // Example slides that mimic the styling from the image
  const demoSlides = [
    {
      content: (
        <div className="slider__content-wrapper">
          <div className="slider__text-container">
            <h2 className="slider__heading">Now available<br />in our store! 👌</h2>
            <p className="slider__subheading">Be the first!</p>
            <button className="slider__cta">ORDER NOW</button>
          </div>
          <div className="slider__image-container">
            <h2 className="slider__product-title">iPhone 14 Pro</h2>
            <p className="slider__product-tagline">Pro. Beyond.</p>
            <div className="slider__product-image-placeholder"></div>
          </div>
        </div>
      ),
    },
    {
      content: (
        <div className="slider__content-wrapper">
          <div className="slider__image-container">
            <img src="../../../public/img/square_banner.png" alt="square_banner_iphone" />
          </div>
        </div>
      ),
    },
    {
      content: <div className="slider__placeholder">Slide 3 Content</div>
    }
  ];

  return (
    <div className="slider-demo">
      <ImageSlider slides={demoSlides} />
    </div>
  );
}; */

export default SliderDemo;
