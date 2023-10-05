import { useMemo, useState } from 'react';
import cn from 'classnames';

import './Slider.scss';

import FirstImage from './SliderImage/1.png';
import TwoImage from './SliderImage/2.jpg';
import ThridImage from './SliderImage/3.jpg';
import Arrow from './SliderImage/Arrow.svg';

const images = [
  { key: 0, image: FirstImage },
  { key: 1, image: TwoImage },
  { key: 2, image: ThridImage },
];

export const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const currentImage = useMemo(() => images
    .find(el => el.key === currentSlide) ?? images[0],
  [currentSlide]);

  return (
    <>
      <div className="slider">
        <div
          className="block-for-border"
          role="button"
          tabIndex={0}
          onClick={prevSlide}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              prevSlide();
            }
          }}
        >
          <button className="slider__control" type="button">
            <img className="arrow-rigth" src={Arrow} alt="" />
          </button>
        </div>

        <img className="slider__image" src={currentImage.image} alt="" />

        <div
          className="block-for-border"
          role="button"
          tabIndex={0}
          onClick={nextSlide}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              prevSlide();
            }
          }}
        >
          <button className="slider__control" type="button">
            <img className="arrow-left" src={Arrow} alt="" />
          </button>
        </div>
      </div>

      <div className="slider__indicators">
        {images.map(({ image, key }) => (
          <div
            key={image}
            className={cn(
              'slider__indicator ', {
                active: key === currentSlide,
              },
            )}
          />
        ))}
      </div>
    </>
  );
};
