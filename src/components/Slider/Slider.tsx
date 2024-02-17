import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import { v4 as getId } from 'uuid';
import cn from 'classnames';

import './Slider.scss';
import { Banner } from '../../types/Banner';
import { Button } from '../Button/Button';

type Props = {
  interval: number,
  slidesCount: number,
  banners: Banner[]
};

export const Slider: React.FC<Props> = ({
  interval,
  slidesCount,
  banners,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSlideLeft = () => {
    if (currentSlide === 0) {
      setCurrentSlide(slidesCount);
    }

    if (currentSlide <= slidesCount - 1) {
      setCurrentSlide(current => current - 1);
    }
  };

  const handleSlideRight = () => {
    if (currentSlide >= 0) {
      setCurrentSlide(current => current + 1);
    }

    if (currentSlide >= slidesCount - 1) {
      setCurrentSlide(0);
    }
  };

  const offset = -(currentSlide * slideWidth);

  useEffect(() => {
    setSlideWidth(containerRef.current?.offsetWidth || 0);

    setInterval(() => {
      setCurrentSlide(current => (
        current >= slidesCount - 1 ? 0 : current + 1
      ));
    }, interval);
  }, [interval, slidesCount]);

  return (
    <div className="slider">
      <div className="slider-container" ref={containerRef}>
        <div
          className="slider-wrapper"
          style={{
            transform: `translateX(${offset}px)`,
          }}
        >
          {
            banners.map(({ img }) => (
              <div
                className="slider-slide"
                key={getId()}
              >
                <img
                  src={img}
                  alt="Banner accessories"
                />
              </div>
            ))
          }
        </div>
      </div>

      <Button
        className="slider-btn slider-btn-prev"
        onClick={handleSlideLeft}
      >
        <img
          className="slider-btn__arrow"
          src="img/icons/arrow-left.svg"
          alt="Arrow left"
        />
      </Button>

      <Button
        className="slider-btn slider-btn-next"
        onClick={handleSlideRight}
      >
        <img
          className="slider-btn__arrow"
          src="img/icons/arrow-right.svg"
          alt="Arrow left"
        />
      </Button>

      <div className="slider-dots">
        {
          banners.map(({ id }) => (
            <div
              className={cn(
                'slider-dot',
                {
                  'slider-dot--active': currentSlide === id,
                },
              )}
              key={getId()}
            />
          ))
        }
      </div>
    </div>
  );
};
