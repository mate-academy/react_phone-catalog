import './Carousel.scss';

import {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';

import classNames from 'classnames';
import { ReactComponent as ArrowLeft } from '../../images/icons/arrow-left.svg';
import {
  ReactComponent as ArrowRight,
} from '../../images/icons/arrow_right.svg';

const slides = [
  { url: './img/slider/1.png' },
  { url: './img/slider/2.png' },
  { url: './img/slider/3.jpg' },
];

const TRANSITION_DURATION = 700;
const PAGE_WIDTH = 1040;

export const Carousel: React.FC = () => {
  const [offset, setOffset] = useState<number>(0);
  const [transitionDuration, setTransitionDuration]
    = useState<number>(TRANSITION_DURATION);
  const [isSliding, setIsSliding] = useState(false);
  const timerRef = useRef<null | NodeJS.Timeout>(null);
  const [currentIndex, setCurrentIndex] = useState(1);

  const slideLength = useMemo(() => slides.length, []);

  useEffect(() => {
    if (offset === 0) {
      setTimeout(() => {
        setTransitionDuration(0);
        setOffset(-(PAGE_WIDTH * slideLength));
      }, transitionDuration);
    }

    if (offset === -(PAGE_WIDTH * (slideLength + 1))) {
      setTimeout(() => {
        setTransitionDuration(0);
        setOffset(-PAGE_WIDTH);
      }, transitionDuration);
    }
  }, [offset]);

  const handleLeftArrowClick = useCallback(() => {
    setIsSliding(true);

    if (!transitionDuration) {
      setTransitionDuration(TRANSITION_DURATION);
    }

    setOffset((current) => {
      const newOffset = current + PAGE_WIDTH;

      return Math.min(newOffset, 0);
    });

    if (currentIndex < 2) {
      setCurrentIndex(slideLength);
    } else {
      setCurrentIndex(currentIndex - 1);
    }

    setTimeout(() => {
      setIsSliding(false);
    }, TRANSITION_DURATION + 30);
  }, [offset, currentIndex]);

  const handleRightArrowClick = useCallback(() => {
    setIsSliding(true);

    if (!transitionDuration) {
      setTransitionDuration(TRANSITION_DURATION);
    }

    setOffset((current) => {
      const newOffset = current - PAGE_WIDTH;
      const maxOffset = -(PAGE_WIDTH * (slideLength + 1));

      return Math.max(newOffset, maxOffset);
    });

    if (currentIndex + 1 > slideLength) {
      setCurrentIndex(1);
    } else {
      setCurrentIndex(currentIndex + 1);
    }

    setTimeout(() => {
      setIsSliding(false);
    }, TRANSITION_DURATION + 30);
  }, [offset, currentIndex]);

  const handleSlideNumberClick = useCallback(
    (index: number) => {
      setTransitionDuration(TRANSITION_DURATION);

      setOffset(-(index * PAGE_WIDTH));
      setCurrentIndex(index + 1);
    },
    [PAGE_WIDTH, offset],
  );

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      handleRightArrowClick();
    }, 5000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [handleRightArrowClick]);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    slideIndex: number,
    handleSlideButtonClick: (index: number) => void,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleSlideButtonClick(slideIndex);
    }
  };

  return (
    <div className="carousel">
      <button
        className="carousel__arrow carousel__arrow--left"
        onClick={handleLeftArrowClick}
        disabled={isSliding}
        type="button"
      >
        <ArrowLeft className="arrow--default" />
      </button>
      <div className="carousel__window">
        <div
          className="carousel__container"
          style={{
            transform: `translateX(${offset}px)`,
            transitionDuration: `${transitionDuration}ms`,
          }}
        >
          <div
            className="carousel__slide"
            style={{ backgroundImage: `url(${slides[slideLength - 1].url})` }}
          />

          {slides.map((slide) => (
            <div
              className="carousel__slide"
              style={{ backgroundImage: `url(${slide.url})` }}
            />
          ))}

          <div
            className="carousel__slide"
            style={{ backgroundImage: `url(${slides[0].url})` }}
          />
        </div>
      </div>
      <button
        className="carousel__arrow carousel__arrow--right"
        onClick={handleRightArrowClick}
        disabled={isSliding}
        type="button"
      >
        <ArrowRight className="arrow--default" />
      </button>

      <div className="carousel__number-conrainer">
        {slides.map((slide, slideIndex) => (
          <div
            className={classNames('carousel__slide-number', {
              'carousel__slide-number--active': slideIndex + 1 === currentIndex,
            })}
            key={slide.url}
            role="button"
            aria-label={`Go to slide ${slideIndex + 1}`}
            onClick={() => handleSlideNumberClick(slideIndex)}
            onKeyDown={(event) => {
              return handleKeyDown(event, slideIndex, handleSlideNumberClick);
            }}
            tabIndex={0}
          />
        ))}
      </div>
    </div>
  );
};
