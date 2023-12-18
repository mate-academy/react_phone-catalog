import { useState, useEffect } from 'react';
import './carousel.scss';

export const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    'img/banner-accessories.png',
    'img/banner-phones.png',
    'img/banner-tablets.png',
  ];

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const renderDots = () => {
    return images.map((image, index) => (
      <div
        key={image}
        className={`dot ${index === currentIndex ? 'active' : ''}`}
        onClick={() => goToSlide(index)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            goToSlide(index);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Slide ${index + 1}`}
      />
    ));
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (
      prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (
      prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const autoplayInterval = 3000;

  useEffect(() => {
    const autoplayTimer = setInterval(goToNext, autoplayInterval);

    return () => clearInterval(autoplayTimer);
  }, [currentIndex]);

  return (
    <>
      <div className="carousel-container">
        <div
          className="button-left"
          onClick={goToPrev}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              goToPrev();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Previous"
        >
          <img className="chevron" src={`${process.env.PUBLIC_URL}/img/Chevron-left.svg`} alt="Previous" />
        </div>
        <div className="slider-container">
          <div className="slides" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {images.map((image, index) => (
              <div key={image} className="slide">
                <img src={`${process.env.PUBLIC_URL}/${image}`} alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
        <div
          className="button-right"
          onClick={goToNext}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              goToNext();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Next"
        >
          <img className="chevron" src={`${process.env.PUBLIC_URL}/img/Chevron-right.svg`} alt="Next" />
        </div>
      </div>
      <div className="dots-container">
        {renderDots()}
      </div>
    </>
  );
};

export default Carousel;
