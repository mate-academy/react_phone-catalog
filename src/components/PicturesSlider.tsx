import { FC, useEffect, useState } from 'react';

import iphones from '../img/banners/slider-iphones.png';
import tablets from '../img/banners/tablets.jpg';
import accessories from '../img/banners/accessories.jpg';
import { SliderButton } from './UI/SliderButton';

export const PicturesSlider: FC = () => {
  const [translateX, setTranslateX] = useState(-1040);
  const [transitionValue, setTransitionValue] = useState(500);

  if (transitionValue === 0) {
    setTimeout(() => setTransitionValue(500), 10);
  }

  const sliderConfig = {
    imgWidth: 1040,
    visibleProducts: 1,
  };

  const images = [
    { title: 'iphones', link: iphones },
    { title: 'tablets', link: tablets },
    { title: 'accessories', link: accessories },
  ];

  const moveTo = (value: number) => {
    setTimeout(() => {
      setTransitionValue(0);
      setTranslateX(value);
    }, 500);
  };

  useEffect(() => {
    if (translateX === 0) {
      moveTo(-3120);
    }

    if (translateX === -4160) {
      moveTo(-1040);
    }
  }, [translateX]);

  const nextSlide = () => {
    setTranslateX(current => current - sliderConfig.imgWidth);
  };

  const prevSlide = () => {
    setTranslateX(current => current + sliderConfig.imgWidth);
  };

  const sliderListStyles = {
    transform: `translateX(${translateX}px)`,
    transition: `transform ${transitionValue}ms`,
  };

  return (
    <div className="pictures-slider">
      <SliderButton
        width="32px"
        height="400px"
        direction="prev"
        action={prevSlide}
      />
      <div className="pictures-slider__container">
        <div className="pictures-slider__content" style={sliderListStyles}>
          <img
            src={accessories}
            alt="helpArmy"
            className="pictures-slider__img"
          />
          {images.map(image => (
            <img
              key={image.link}
              src={image.link}
              alt={image.title}
              className="pictures-slider__img"
            />
          ))}
          <img
            src={iphones}
            alt="iphones"
            className="pictures-slider__img"
          />
        </div>
      </div>
      <SliderButton
        width="32px"
        height="400px"
        direction="next"
        action={nextSlide}
      />
    </div>
  );
};
