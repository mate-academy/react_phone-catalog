import { Link } from 'react-router-dom';
import './PictureSlider.scss';
import classNames from 'classnames';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

const SLIDES_COUNT = 3;
const SLIDE_DELAY = 5000;

export const PictureSlider = () => {
  const [selectedSlider, setSelectedSlider] = useState(0);

  const slidesArray = useMemo(
    () => new Array(SLIDES_COUNT).fill(0).map((value, index) => index + value),
    [],
  );

  const slidingIntervalRef = useRef(0);

  const switchToNextSlide = () => {
    setSelectedSlider(current => {
      return current + 1 < SLIDES_COUNT ? current + 1 : 0;
    });
  };

  const switchToPreviousSlide = () => {
    setSelectedSlider(current => {
      return current - 1 >= 0 ? current - 1 : SLIDES_COUNT - 1;
    });
  };

  const setSlidingInterval = () => {
    window.clearInterval(slidingIntervalRef.current);

    slidingIntervalRef.current = window.setInterval(
      switchToNextSlide,
      SLIDE_DELAY,
    );
  };

  useEffect(() => {
    setSlidingInterval();
  }, []);

  const switchSlideClickHandler = (newSlideIndex: number) => {
    setSelectedSlider(newSlideIndex);
    setSlidingInterval();
  };

  const switchNextSlideHandler = () => {
    switchToNextSlide();
    setSlidingInterval();
  };

  const switchPrevSlideHandler = () => {
    switchToPreviousSlide();
    setSlidingInterval();
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => switchNextSlideHandler(),
    onSwipedRight: () => switchPrevSlideHandler(),
  });

  return (
    <div className="slider">
      <div className="slider__main">
        <button
          className="
          slider__switch-button
          slider__switch-button--direction--prev
          "
          onClick={switchPrevSlideHandler}
        />
        <div className="slider__list-wrapper" {...swipeHandlers}>
          <ul
            className={classNames(
              'slider__list',
              `slider__list--show--${selectedSlider}`,
            )}
          >
            <li className="slider__item slider__item--page--1">
              <Link className="slider__link" to="/phones?query=iphone+14">
                <div className="slider__text-block">
                  <h3
                    className="
                      slider__item-title
                      slider__item-title--color--gradient
                    "
                  >
                    Iphone 14
                  </h3>
                  <p className="slider__item-description">Now available!</p>
                  <button className="slider__slide-button">Order now</button>
                </div>
              </Link>
            </li>
            <li className="slider__item slider__item--page--2">
              <Link className="slider__link" to="/accessories">
                <div className="slider__text-block">
                  <h3
                    className="
                      slider__item-title
                    "
                  >
                    Apple watch
                  </h3>
                  <p className="slider__item-description">
                    Track your activity
                  </p>
                  <button className="slider__slide-button">Order now</button>
                </div>
              </Link>
            </li>
            <li className="slider__item slider__item--page--3">
              <Link className="slider__link" to="/tablets?sort=price">
                <div className="slider__text-block">
                  <h3 className="slider__item-title">Summer sale</h3>
                  <p className="slider__item-description"></p>
                  <button className="slider__slide-button">
                    Find best offer
                  </button>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <button
          className="
          slider__switch-button
          slider__switch-button--direction--next
          "
          onClick={switchNextSlideHandler}
        />
      </div>

      <div className="slider__pagination">
        {slidesArray.map(value => (
          <button
            className={classNames('slider__page-button', {
              active: value === selectedSlider,
            })}
            key={value}
            onClick={() => {
              switchSlideClickHandler(value);
            }}
          ></button>
        ))}
      </div>
    </div>
  );
};
