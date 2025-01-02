import React, { useState, useEffect, useRef, useContext } from 'react';
import './PicturesSlider.scss';
import { Icon } from '../../../shared/Icon';
import { iconsObject } from '../../../../constants/iconsObject';
import { GlobalContext } from '../../../../store/GlobalContext';

export const PicturesSlider: React.FC = () => {
  const images = [
    'img/banner-phones.png',
    'img/banner-accessories.png',
    'img/banner-tablets.png',
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const { theme } = useContext(GlobalContext);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(nextSlide, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(nextSlide, 5000);
  };

  const handleNextButton = () => {
    nextSlide();

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(nextSlide, 5000);
  };

  const handlePrevButton = () => {
    prevSlide();

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(nextSlide, 5000);
  };

  return (
    <div className="picturesSlider">
      <div className="picturesSlider__container">
        <div
          className={
            theme === 'light'
              ? 'picturesSlider__button'
              : 'picturesSlider__button picturesSlider__button--dark'
          }
          onClick={handlePrevButton}
        >
          {theme === 'light' ? (
            <Icon icon={iconsObject.arrow_left} />
          ) : (
            <Icon icon={iconsObject.arrow_left__disabled} />
          )}
        </div>

        <div className="picturesSlider__container-image">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt="Slide"
              className={
                currentSlide === index
                  ? 'picturesSlider__image picturesSlider__image--active'
                  : 'picturesSlider__image'
              }
            />
          ))}
        </div>

        <div className="picturesSlider__button" onClick={handleNextButton}>
          {theme === 'light' ? (
            <Icon icon={iconsObject.arrow_right} />
          ) : (
            <Icon icon={iconsObject.arrow_right__disabled} />
          )}
        </div>
      </div>

      <div className="picturesSlider__dots">
        {images.map((_, index) => (
          <div
            key={index}
            className={
              currentSlide === index
                ? 'picturesSlider__dot picturesSlider__dot--active'
                : 'picturesSlider__dot'
            }
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};
