import React, { useEffect, useState } from 'react';
import './Banner.scss';
import cn from 'classnames';
import { SliderBanner } from '../../type/sliderBanner';

type Props = {
  slides: SliderBanner[];
};

export const Banner: React.FC<Props> = ({ slides }) => {
  const [slide, setSlide] = useState(0);

  const goForward = () => {
    if (slide <= slides.length - 2) {
      setSlide(slide + 1);
    } else {
      setSlide(0);
    }
  };

  const goBack = () => {
    if (slide >= 1) {
      setSlide(slide - 1);
    } else {
      setSlide(slides.length - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(goForward, 5000);

    return () => clearInterval(interval);
  }, [goForward]);

  return (
    <div className="banner">
      <div className="banner-slider">
        <button
          aria-label="Go back button"
          type="button"
          className="banner-slider__button button-icon"
          onClick={goBack}
        >
          <span className="icon icon--arrow-left" />
        </button>

        <div className="banner-slider__images-block">
          {slides.map(item => (
            <img
              className={
                slide === item.id
                  ? 'banner-slider__image'
                  : 'banner-slider__image--hidden'
              }
              src={item.src}
              alt={item.alt}
              key={item.id}
            />
          ))}
        </div>
        <button
          aria-label="Go forward button"
          type="button"
          className="banner-slider__button button-icon"
          onClick={goForward}
        >
          <span className="icon icon--arrow-right" />
        </button>
      </div>

      <div className="banner-slider__bottom">
        <div className="banner-slider__dots">
          {slides.map((img, index) => (
            <button
              key={img.id}
              aria-label="Slider button"
              type="button"
              className="banner-slider__button-dots"
              onClick={() => setSlide(index)}
            >
              <div
                className={cn('banner-slider__dot', {
                  'banner-slider__dot--active': slide === index,
                })}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
