import React, { useState } from "react";
import { useSwipeable } from 'react-swipeable';
import './Slider.scss';

const slides = [
  {
    src: '../../../public/img/banner-accessories.png',
    link: '/page1'
  },
  {
    src: '../../../public/img/banner-phones.png',
    link: '/page2'
  },
  {
    src: '../../../public/img/banner-tablets.png',
    link: '/page3'
  }
]


export const Slider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  })

  return (
    <div className="slider">
      <div className="container">
        <div className="slider_container">
          <button
            className="slider__button slider__button--prev"
            onClick={handlePrev}
          >
            &#8249;
          </button>
        
          <div className="slider__image-wrapper" {...swipeHandlers}>
        
            <div
              className="slider__image-container"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`slider__slide ${index === currentIndex ? 'active' : ''
                    }`}
                >
                  <img src={slide.src} alt={`Slide ${index + 1}`} />
                </div>
              ))}
              <div className="slider_text-wrappper">
                <p className="slider_text">
                  Now avialable in our store!
                </p>
                <p className="slider_description">
                  Be the first!
                </p>
        
                <button
                  className="slider_text-button"
                  onClick={() => (window.location.href = slides[currentIndex].link)}
                >
                  Order now
                </button>
              </div>
            </div>
          </div>
          <button
            className="slider__button slider__button--next"
            onClick={handleNext}
          >
            &#8250;
          </button>
        </div>
        <div className="slider__indicators">
          <div className="slider__indicators-wrapper">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`slider__indicator ${index === currentIndex ? 'active' : ''
                  }`}
                onClick={() => setCurrentIndex(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}