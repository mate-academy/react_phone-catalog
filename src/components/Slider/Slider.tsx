import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import './Slider.scss';

type Props = {
  slides: string[],
};

export const Slider: React.FC<Props> = ({ slides }) => {
  const [width, setWidth] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderLine = useRef<HTMLDivElement | null>(null);
  const sliderWindow = useRef<HTMLDivElement | null>(null);

  const getWidth = () => {
    setWidth(prev => {
      if (sliderWindow.current) {
        return sliderWindow.current.offsetWidth;
      }

      return prev;
    });
  };

  const showNext = () => {
    setCurrentSlide(prev => {
      if (prev === slides.length - 1) {
        return 0;
      }

      return prev + 1;
    });
  };

  const showPrev = () => {
    setCurrentSlide(prev => {
      if (prev === 0) {
        return slides.length - 1;
      }

      return prev - 1;
    });
  };

  useEffect(() => {
    getWidth();
    window.addEventListener('resize', getWidth);

    const intervalId = setInterval(() => showNext(), 5000);

    return () => {
      window.removeEventListener('resize', getWidth);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="slider">
      <div className="slider__content">
        <button
          type="button"
          className="button slider__button"
          onClick={() => showPrev()}
        >
          <img
            src="./assets/arrow-prev.svg"
            alt="arrow"
            className="slider__arrow"
          />
        </button>
        <div
          ref={sliderWindow}
          className="slider__window"
        >
          <div
            ref={sliderLine}
            className="slider__line"
            style={{
              width: `${width * slides.length}px`,
              transform: `translateX(-${currentSlide * width}px)`,
            }}
          >
            {slides.map(imageUrl => (
              <img
                key={imageUrl}
                src={imageUrl}
                alt="product"
                style={{
                  width: `${width}px`,
                }}
              />
            ))}
          </div>
        </div>
        <button
          type="button"
          className="button slider__button"
          onClick={() => showNext()}
        >
          <img
            src="./assets/arrow-next.svg"
            alt="arrow"
            className="slider__arrow"
          />
        </button>
      </div>
      <div className="slider__indicators">
        {slides.map(imageUrl => (
          <span
            key={imageUrl}
            className={classNames('slider__indicator', {
              'slider__indicator--is-active': slides[currentSlide] === imageUrl,
            })}
          />
        ))}
      </div>
    </div>
  );
};
