import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

export const Slider = () => {
  const [current, setCurrent] = useState(0);
  const length = 3;
  const autoSlide = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (autoSlide.current) {
      clearTimeout(autoSlide.current);
    }
  };

  const startTimeout = () => {
    autoSlide.current = setTimeout(() => {
      setCurrent(current === 0 ? length - 1 : current - 1);
    }, 5000);
  };

  const nextSlide = () => {
    resetTimeout();
    setCurrent(current === length - 1 ? 0 : current + 1);
    startTimeout();
  };

  const prevSlide = () => {
    resetTimeout();
    setCurrent(current === 0 ? length - 1 : current - 1);
    startTimeout();
  };

  useEffect(() => {
    startTimeout();

    return () => {
      resetTimeout();
    };
  }, [current]);

  return (
    <>
      <div className="slider">
        <button
          type="button"
          className="slider__button"
          onClick={nextSlide}
        >
          <div className="arrow arrow-left" />
        </button>
        <ul className="slider__carousel">
          <li>
            <Link
              to="/accessories"
              className={cn('slider__slide slider__accessories ',
                {
                  slider__slide__prev: current === 0,
                  slider__slide__current: current === 1,
                  slider__slide__next: current === 2,
                })}
            />
          </li>
          <li>
            <Link
              to="/tablets"
              className={cn('slider__slide slider__tablets',
                {
                  slider__slide__prev: current === 1,
                  slider__slide__current: current === 2,
                  slider__slide__next: current === 0,
                })}
            />
          </li>
          <li>
            <Link
              to="/phones"
              className={cn('slider__slide slider__phones',
                {
                  slider__slide__prev: current === 2,
                  slider__slide__current: current === 0,
                  slider__slide__next: current === 1,
                })}
            />
          </li>
        </ul>
        <button
          type="button"
          className="slider__button"
          onClick={prevSlide}
        >
          <div className="arrow arrow-right" />
        </button>

        <div className="dot-container">
          <span className={cn('dot', { dot__active: current === 0 })} />
          <span className={cn('dot', { dot__active: current === 2 })} />
          <span className={cn('dot', { dot__active: current === 1 })} />
        </div>
      </div>
    </>
  );
};
