import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import './Slider.scss';

type Props = {
  images: string[],
  infinite?: boolean,
};

export const Slider: React.FC<Props> = ({
  images,
  infinite,
}) => {
  const TRANSITION_DURATION = 300;

  const [slides, setSlides] = useState<string[]>(images);
  const [currentSlide, setCurrentSlide] = useState(() => {
    if (infinite) {
      return 1;
    }

    return 0;
  });

  const [width, setWidth] = useState(0);
  const [offset, setOffset] = useState(0);
  const [transitionDuration, setTransitionDuration] = useState(0);
  const sliderLine = useRef<HTMLDivElement | null>(null);
  const sliderWindow = useRef<HTMLDivElement | null>(null);

  const setCurrentWidth = () => {
    setWidth(prev => {
      if (sliderWindow.current) {
        return sliderWindow.current.offsetWidth;
      }

      return prev;
    });

    if (infinite) {
      setOffset(prev => {
        if (sliderWindow.current) {
          return sliderWindow.current.offsetWidth * currentSlide;
        }

        return prev;
      });
    }
  };

  const showNext = () => {
    setTransitionDuration(TRANSITION_DURATION);
    setOffset(prev => {
      const maxOffset = (slides.length - 1) * width;

      if (prev === maxOffset) {
        return maxOffset;
      }

      return prev + width;
    });

    setCurrentSlide(prev => {
      if (infinite && prev === slides.length - 2) {
        return 1;
      }

      if (prev === slides.length - 1) {
        return slides.length - 1;
      }

      return prev + 1;
    });
  };

  const showPrev = () => {
    setTransitionDuration(TRANSITION_DURATION);
    setOffset(prev => {
      if (prev === 0) {
        return 0;
      }

      return prev - width;
    });

    setCurrentSlide(prev => {
      if (infinite && prev === 1) {
        return slides.length - 2;
      }

      if (prev === 0) {
        return 0;
      }

      return prev - 1;
    });
  };

  useEffect(() => {
    setTransitionDuration(0);
    setCurrentWidth();
    window.addEventListener('resize', setCurrentWidth);
  }, [slides]);

  useEffect(() => {
    if (infinite) {
      setSlides(() => {
        const newSlides = [
          images[images.length - 1],
          ...images,
          images[0],
        ];

        return newSlides;
      });
    }
  }, [width]);

  useEffect(() => {
    if (infinite) {
      if (offset === 0) {
        setTimeout(() => {
          setTransitionDuration(0);
          setOffset(width * (slides.length - 2));
        }, transitionDuration);

        return;
      }

      if (offset === width * (slides.length - 1)) {
        setTimeout(() => {
          setTransitionDuration(0);
          setOffset(width);
        }, transitionDuration);
      }
    }
  }, [offset, width]);

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
              transform: `translateX(-${offset}px)`,
              transitionDuration: `${transitionDuration}ms`,
            }}
          >
            {slides && (
              slides.map(slide => (
                <img
                  key={slides.indexOf(slide)}
                  src={slide}
                  alt="product"
                  style={{
                    width: `${width}px`,
                  }}
                />
              ))
            )}
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
        {images.map(imgUrl => (
          <span
            key={imgUrl}
            className={classNames('slider__indicator', {
              'slider__indicator--is-active': slides[currentSlide] === imgUrl,
            })}
          />
        ))}
      </div>
    </div>
  );
};

Slider.defaultProps = {
  infinite: false,
};
