import { useCallback, useEffect, useRef, useState } from 'react';
import './Slider.module.scss';
import cn from 'classnames';

export const Slider = () => {
  const [activeItem, setActiveItem] = useState(0);
  const timerId = useRef(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const handleNextButton = useCallback(() => {
    if (activeItem === 2) {
      setActiveItem(0);
    } else {
      setActiveItem(activeItem + 1);
    }
  }, [activeItem]);

  const handlePrevButton = () => {
    if (activeItem === 0) {
      setActiveItem(2);
    } else {
      setActiveItem(activeItem - 1);
    }
  };

  useEffect(() => {
    if (timerId.current) {
      window.clearTimeout(timerId.current);
    }

    timerId.current = autoPlay
      ? window.setTimeout(() => handleNextButton(), 5000)
      : 0;

    return () => window.clearTimeout(timerId.current);
  }, [handleNextButton, autoPlay]);

  return (
    <div className="slider">
      <div className="slider__wrapper">
        <button className="slider__button" onClick={() => handlePrevButton()}>
          <div className="left__arrow prev__button"></div>
        </button>
        <ul className="slider__list">
          {activeItem === 0 && (
            <li
              className="slider__item first"
              onMouseEnter={() => setAutoPlay(false)}
              onMouseLeave={() => setAutoPlay(true)}
            ></li>
          )}
          {activeItem === 1 && (
            <li
              className="slider__item second"
              onMouseEnter={() => setAutoPlay(false)}
              onMouseLeave={() => setAutoPlay(true)}
            ></li>
          )}
          {activeItem === 2 && (
            <li
              className="slider__item third"
              onMouseEnter={() => setAutoPlay(false)}
              onMouseLeave={() => setAutoPlay(true)}
            ></li>
          )}
        </ul>
        <button className="slider__button" onClick={() => handleNextButton()}>
          <div className="right__arrow next__button"></div>
        </button>
      </div>

      <div className="slider__dots__buttons">
        <button
          className={'slider__dots__button'}
          onClick={() => setActiveItem(0)}
        >
          <div
            className={cn('slider__dots', {
              'is--primary': activeItem === 0,
            })}
          ></div>
        </button>
        <button
          className={'slider__dots__button'}
          onClick={() => setActiveItem(1)}
        >
          <div
            className={cn('slider__dots', {
              'is--primary': activeItem === 1,
            })}
          ></div>
        </button>
        <button
          className={'slider__dots__button'}
          onClick={() => setActiveItem(2)}
        >
          <div
            className={cn('slider__dots', {
              'is--primary': activeItem === 2,
            })}
          ></div>
        </button>
      </div>
    </div>
  );
};
