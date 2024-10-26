import { useState } from 'react';
import './BannerSlider.scss';

import arrow from '../../../../public/img/icons/slider-button-day.png';
import arrowNight from '../../../../public/img/icons/slider-button-night.png';

import { Slide } from './Slide';
import { useSlides } from '../../../hooks/useSlides';

export const BannerSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, isMobile] = useSlides();

  const handlePrevSlide = () => {
    setCurrentSlide(curr => (curr === 0 ? slides.length - 1 : curr - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide(curr => (curr === slides.length - 1 ? 0 : curr + 1));
  };

  return (
    <div className="pictures-slider">
      <div className="pictures-slider__main">
        {!isMobile && (
          <button onClick={handlePrevSlide} className="pictures-slider__button">
            <div className="icon icon-left">
              <img src="" alt="Arrow left" />
            </div>
          </button>
        )}

        {slides.map(slide => (
          <Slide
            key={slide.id}
            imgUrl={slide.url}
            alt={slide.alt}
            active={slide.id === currentSlide}
          />
        ))}

        {!isMobile && (
          <button onClick={handleNextSlide} className="pictures-slider__button">
            <div className="icon icon-right">Next</div>
          </button>
        )}
      </div>

      <div className="pictures-slider__switch">
        {slides.map(slide => (
          <div key={slide.id} className="dot">
            <img src="" alt="Arrow right" />
          </div>
        ))}
      </div>
    </div>
  );
};
