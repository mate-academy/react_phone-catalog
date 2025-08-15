import { useState } from 'react';
import scss from './PicturesSlider.module.scss';
import { Dashes } from '../Dashes/Dashes';
import { slides } from '../../../../assets/slider/slider';

export const PicturesSlider = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  return (
    <div className={scss.slider}>
      <picture>
        <source srcSet="/assets/slider/slider-ipad-pro.webp" />
        <img
          src="/assets/slider/apple-ipad-pro.jpg"
          alt="The newest Iphone"
          className={scss.slider__picture}
          loading="lazy"
          decoding="async"
        />
      </picture>
      <Dashes
        activeSlide={activeSlide}
        count={slides.length / 2}
        setActiveSlide={setActiveSlide}
      />
    </div>
  );
};
