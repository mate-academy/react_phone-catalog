/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import {
  useCallback,
  useEffect,
  useMemo, useState,
} from 'react';

const pictures = [
  { id: 1, title: 'phones', url: '_new/img/banner-phones.png' },
  { id: 2, title: 'tablets', url: '_new/img/banner-tablets.png' },
  { id: 3, title: 'accessories', url: '_new/img/banner-accessories.png' },
];

const PICTURE_WIDTH = 1040;
let ANIMATION_DURATION = '1000ms';

export const Banner = () => {
  const [current, setCurrent] = useState(1);
  const [translateX, setTranslateX] = useState(PICTURE_WIDTH);
  const [isDisabledPrev, setIsDisabledPrev] = useState(false);
  const [isDisabledNext, setIsDisabledNext] = useState(false);

  const slides = useMemo(() => {
    let items = [...pictures];

    if (pictures.length > 1) {
      items = [
        { ...pictures[pictures.length - 1], id: 0 },
        ...pictures,
        { ...pictures[0], id: pictures.length + 1 },
      ];
    }

    return items;
  }, []);

  const wrapperWidth = PICTURE_WIDTH * slides.length;

  const handleSwitchSlides = useCallback((mode: string) => {
    ANIMATION_DURATION = '1000ms';

    if (mode === 'prev') {
      if (current <= 1) {
        setTranslateX(0);
        setCurrent(pictures.length);
        setIsDisabledPrev(true);
        setTimeout(() => setIsDisabledPrev(false), 1000);
      } else {
        setTranslateX(PICTURE_WIDTH * (current - 1));
        setCurrent(prev => prev - 1);
      }
    } else if (mode >= 'next') {
      if (current === pictures.length) {
        setCurrent(1);
        setTranslateX(PICTURE_WIDTH * (pictures.length + 1));
        setIsDisabledNext(true);
        setTimeout(() => setIsDisabledNext(false), 1000);
      } else {
        setTranslateX(PICTURE_WIDTH * (current + 1));
        setCurrent(prev => prev + 1);
      }
    }
  }, [current]);

  useEffect(() => {
    const transitionEnd = () => {
      if (current <= 1) {
        ANIMATION_DURATION = '0ms';
        setTranslateX(PICTURE_WIDTH * current);
      }

      if (current >= pictures.length) {
        ANIMATION_DURATION = '0ms';
        setTranslateX(PICTURE_WIDTH * pictures.length);
      }
    };

    document.addEventListener('transitionend', transitionEnd);

    return () => {
      document.removeEventListener('transitionend', transitionEnd);
    };
  }, [current, slides]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleSwitchSlides('next');
    }, 5000);

    return () => clearInterval(interval);
  }, [handleSwitchSlides, current]);

  return (
    <div className="banner">
      <div className="banner__container">
        <button
          type="button"
          className="banner__button"
          onClick={() => handleSwitchSlides('prev')}
          disabled={isDisabledPrev}
        >
          <i className="fa fa-angle-left fa-fw" aria-hidden="true" />
        </button>

        <div className="banner__img-container">
          <div
            className="banner__img-wrapper"
            style={{
              width: `${wrapperWidth}px`,
              transform: `translateX(-${translateX}px)`,
              transition: ANIMATION_DURATION,
            }}
          >
            {slides.map(picture => (
              <img
                className="banner__img"
                key={picture.id}
                src={picture.url}
                alt={picture.title}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          className="banner__button"
          onClick={() => handleSwitchSlides('next')}
          disabled={isDisabledNext}
        >
          <i className="fa fa-angle-right fa-fw" aria-hidden="true" />
        </button>
      </div>
      <div className="dots">
        {pictures.map(pic => (
          <div
            key={pic.id}
            className={classNames(
              'dots__dot',
              { 'dots__dot--active': current === pic.id },
            )}
          />
        ))}
      </div>
    </div>
  );
};
