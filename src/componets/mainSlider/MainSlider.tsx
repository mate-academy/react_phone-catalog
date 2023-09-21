import { useEffect, useState } from 'react';
import './MainSlider.scss';
import classNames from 'classnames';
import buttonToPrevious from '../../img/buttonToPrevious.svg';
import buttonToNext from '../../img/buttonToNext.svg';
import banner_phones from '../../img/banner-phones.png';
import banner_accessories from '../../img/banner-accessories.png';
import banner_tablets from '../../img/banner-tablets.png';

export const MainSlider = () => {
  const images = [banner_phones, banner_accessories, banner_tablets];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToPrevious = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0
        ? images.length - 1
        : prevIndex - 1));
      setIsTransitioning(false);
    }, 300);
  };

  const goToNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1
        ? 0
        : prevIndex + 1));
      setIsTransitioning(false);
    }, 300);
  };

  const handleDotClick = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setIsTransitioning(false);
    }, 300);
  };

  const autoAdvance = () => {
    goToNext();
  };

  useEffect(() => {
    const intervalId = setInterval(autoAdvance, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="slider">
      <div className="slider__main columns">
        <button
          type="button"
          className="slider__button"
          onClick={goToPrevious}
        >
          <img
            src={buttonToPrevious}
            alt="Go to previous"
            className="slider__button-image"
          />
        </button>
        <div className="slider__image-container">
          <img
            src={images[currentImageIndex]}
            alt={`${currentImageIndex + 1}`}
            className={classNames('slider__image', {
              slider__transitioning: isTransitioning,
            })}
          />
        </div>
        <button
          type="button"
          className="slider__button"
          onClick={goToNext}
        >
          <img
            src={buttonToNext}
            alt="Go to next"
            className="slider__button-image"
          />
        </button>
      </div>
      <div className="slider__dots">
        {images.map((_, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className={`slider__dot ${
              currentImageIndex === index ? 'slider__dot-active' : ''
            }`}
            onClick={() => handleDotClick(index)}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>

  );
};
