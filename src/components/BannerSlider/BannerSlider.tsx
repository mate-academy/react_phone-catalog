import { useEffect, useState } from 'react';
import './BannerSlider.scss';
import { SideButton, Dots } from './components';
import { Direction } from '../../types/enums/Direction';

const images = {
  phones: '_new/img/banner-phones.png',
  tablets: '_new/img/banner-tablets.png',
  accessories: '_new/img/banner-accessories.png',
};

const IMAGE_CHANGE_INTERVAL = 3000;

export const BannerSlider = () => {
  const [position, setPosition] = useState<Direction | number>(0);
  const [currentSlideIndex, setCurrentSlide] = useState(0);

  const imagesEntries = Object.entries(images);

  const handleSlide = (action: 'back' | 'next') => {
    if (action === 'next') {
      if (currentSlideIndex >= imagesEntries.length - 1) {
        setCurrentSlide(0);
        setPosition(0);
      } else {
        setCurrentSlide(prev => prev + 1);
        setPosition(prev => prev + Direction.next);
      }
    }

    if (action === 'back') {
      if (currentSlideIndex <= 0) {
        setCurrentSlide(0);
        setPosition(0);
      } else {
        setCurrentSlide(prev => prev - 1);
        setPosition(prev => prev + Direction.back);
      }
    }
  };

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      handleSlide('next');
    }, IMAGE_CHANGE_INTERVAL);

    return () => {
      clearInterval(sliderInterval);
    };
  });

  return (
    <div className="banner-slider">
      <div className="banner-slider__upper-content">
        <SideButton
          side="back"
          handleSlide={handleSlide}
        />

        <div className="banner-slider__img-container">
          {imagesEntries.map(image => (
            <div
              className="banner-slider__picture"
              style={{
                transform: `translate(${position}px)`,
                transition: '0.7s',
              }}
            >
              <img
                className="banner-slider__img"
                alt={image[0]}
                src={image[1]}
              />
            </div>
          ))}
        </div>

        <SideButton
          handleSlide={handleSlide}
          side="next"
        />
      </div>

      <Dots
        images={imagesEntries}
        currentSlideIndex={currentSlideIndex}
      />
    </div>
  );
};
