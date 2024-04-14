import React, { useState } from 'react';
import classNames from 'classnames';

import './PhotoSlider.scss';

type Props = {
  images: string[];
};

export const PhotoSlider: React.FC<Props> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = () => {
    const index = currentIndex === 0 ? images.length - 1 : currentIndex - 1;

    setCurrentIndex(index);
  };

  const goToNextSlide = () => {
    const index = currentIndex === images.length - 1 ? 0 : currentIndex + 1;

    setCurrentIndex(index);
  };

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touchStartX = e.touches[0].clientX;

    const handleTouchMove = (event: TouchEvent) => {
      const touchEndX = event.touches[0].clientX;

      if (touchEndX - touchStartX > 50) {
        goToPrevSlide();
      } else if (touchStartX - touchEndX > 50) {
        goToNextSlide();
      }

      document.removeEventListener('touchmove', handleTouchMove);
    };

    document.addEventListener('touchmove', handleTouchMove);
  };

  return (
    <>
      <img
        src={images[currentIndex]}
        alt="current photo"
        className="photo-slider__active-photo"
      />

      <div className="photo-slider__images">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className={classNames('photo-slider__image', {
              'photo-slider__image--active': index === currentIndex,
            })}
            onClick={() => handleImageClick(index)}
            onTouchStart={handleTouchStart}
          />
        ))}
      </div>
    </>
  );
};
