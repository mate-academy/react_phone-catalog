import React, { useState, useEffect } from 'react';
import './PicturesSlider.scss';
import { Order } from '../Order/Order';

interface PicturesSliderProps {
  images: string[];
}

export const PicturesSlider: React.FC<PicturesSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="pictures-slider">
      <div className="container">
        <Order />
        <div className="slider">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index}`}
              className={index === currentIndex ? 'slide active' : 'slide'}
            />
          ))}
        </div>
      </div>
      <button className="previous controls" onClick={goToPrevious}>
        <div className="arrow">{'<'}</div>
      </button>
      <button className="next controls" onClick={goToNext}>
        <div className="arrow">{'>'}</div>
      </button>
      <div className="indicators">
        {images.map((_, index) => (
          <div
            key={index}
            className={
              index === currentIndex ? 'indicator active' : 'indicator'
            }
            onClick={() => goToImage(index)}
          />
        ))}
      </div>
    </div>
  );
};
