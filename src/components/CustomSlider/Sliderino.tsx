import { useState, useEffect, useRef } from 'react';

const ImageSlider = ({ slides = [], autoRotateTime = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

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
    <div className="slider">
      <div className="slider__container">
        {slideContent.map((slide, index) => (
          <div
            key={index}
            className={`slider__slide ${index === currentIndex ? 'slider__slide--active' : ''}`}
            style={{ transform: `translateX(${100 * (index - currentIndex)}%)` }}
          >
            {slide.content}
          </div>
        ))}

        <button
          className="slider__arrow slider__arrow--left"
          onClick={goToPrevious}
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <button
          className="slider__arrow slider__arrow--right"
          onClick={goToNext}
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

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
      )
    },
    {
      content: <div className="slider__placeholder">Slide 2 Content</div>
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
};

// Styling for the slider
const styles = `
.slider {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  background-color: #1a1a1a;
  border-radius: 8px;
}

.slider__container {
  position: relative;
  width: 100%;
  height: 100%;
}

.slider__slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease;
}

.slider__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 1);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: background-color 0.3s;
}

.slider__arrow:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

.slider__arrow svg {
  width: 20px;
  height: 20px;
}

.slider__arrow--left {
  left: 20px;
}

.slider__arrow--right {
  right: 16px;
}

.slider__pagination {
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.slider__bullet {
  width: 24px;
  height: 4px;
  background-color: rgb(196, 196, 196);
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  padding: 0;
  border-radius: 2px;
}

.slider__bullet--active {
  background-color: black;
}

/* Styling for the demo content */
.slider__content-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  color: white;
}

.slider__text-container {
  flex: 1;
  padding: 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.slider__heading {
  font-size: 36px;
  margin: 0 0 16px;
  color: #a685ff;
}

.slider__subheading {
  font-size: 18px;
  margin: 0 0 32px;
  color: #cccccc;
}

.slider__cta {
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 12px 40px;
  border-radius: 100px;
  font-size: 16px;
  cursor: pointer;
  width: fit-content;
  transition: background-color 0.3s;
}

.slider__cta:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.slider__image-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px;
}

.slider__product-title {
  font-size: 32px;
  margin: 0;
}

.slider__product-tagline {
  font-size: 16px;
  margin: 8px 0 32px;
  color: #cccccc;
}

.slider__product-image-placeholder {
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}

.slider__placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: white;
  font-size: 24px;
}

.slider-demo {
  max-width: 1000px;
  margin: 0 auto;
}
`;

export default SliderDemo;
