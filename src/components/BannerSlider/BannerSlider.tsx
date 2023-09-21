import { useEffect, useState } from 'react';
import './BannerSlider.scss';
import { Dots, SideButton } from './components';
import { Link } from 'react-router-dom';

export enum BannerSliderDirection {
  Back = 'back',
  Next = 'next',
}

export type ImageType = {
  id: string;
  src: string;
};

const images: ImageType[] = [
  { id: 'phones', src: 'img/banner-phones.png' },
  { id: 'tablets', src: 'img/banner-tablets.png' },
  { id: 'accessories', src: 'img/banner-accessories.png' },
];

const IMAGE_CHANGE_INTERVAL = 5000;
const SLIDE_WIDTH = 1040;

export const BannerSlider = () => {
  const [position, setPosition] = useState<number>(0);
  const [currentSlideIndex, setCurrentSlide] = useState(0);

  const handleSlide = (action: BannerSliderDirection) => {
    if (action === BannerSliderDirection.Next) {
      if (currentSlideIndex >= images.length - 1) {
        setCurrentSlide(0);
        setPosition(0);
      } else {
        setCurrentSlide(prev => prev + 1);
        setPosition(prev => prev - SLIDE_WIDTH);
      }
    }

    if (action === BannerSliderDirection.Back) {
      if (currentSlideIndex <= 0) {
        setCurrentSlide(images.length - 1);
        setPosition(-SLIDE_WIDTH * (images.length - 1));
      } else {
        setCurrentSlide(prev => prev - 1);
        setPosition(prev => prev + SLIDE_WIDTH);
      }
    }
  };

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      handleSlide(BannerSliderDirection.Next);
    }, IMAGE_CHANGE_INTERVAL);

    return () => {
      clearInterval(sliderInterval);
    };
  });

  return (
    <div className="banner-slider">
      <div className="banner-slider__upper-content">
        <SideButton
          side={BannerSliderDirection.Back}
          handleSlide={handleSlide}
        />

        <div
          className="banner-slider__img-container"
        >
          {images.map(({ id, src }) => (
            <div
              key={id}
              className="banner-slider__picture"
              style={{
                transform: `translate(${position}px)`,
                transition: '0.7s ease',
              }}
            >
              <Link
                to={`/${id}`}
              >
                <img
                  className="banner-slider__img"
                  alt={id}
                  src={src}
                />
              </Link>

            </div>
          ))}
        </div>

        <SideButton
          handleSlide={handleSlide}
          side={BannerSliderDirection.Next}
        />
      </div>

      <Dots
        images={images}
        currentSlideIndex={currentSlideIndex}
      />
    </div>
  );
};
