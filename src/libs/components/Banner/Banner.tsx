/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';

import { BANNER_IMAGES } from '../../constants';

import { Icon } from '../Icon';

import './Banner.scss';

export const Banner = () => {
  const [translateX, setTranslateX] = useState(0);
  const [slideId, setSlideId] = useState(0);
  const containerRef = useRef<HTMLUListElement>(null);

  const images = Object.entries(BANNER_IMAGES);
  const imagesCount = images.length - 1;

  const handleNext = () => {
    if (!containerRef.current) {
      return;
    }

    if (slideId < imagesCount) {
      setTranslateX(prev => (
        prev - (containerRef.current as HTMLUListElement).offsetWidth
      ));
      setSlideId(prev => prev + 1);
    } else {
      setTranslateX(0);
      setSlideId(0);
    }
  };

  const handlePrev = () => {
    if (!containerRef.current) {
      return;
    }

    if (slideId === 0) {
      setTranslateX(
        -(imagesCount)
        * (containerRef.current as HTMLUListElement).offsetWidth,
      );
      setSlideId(imagesCount);
    } else {
      setTranslateX(prev => (
        prev + (containerRef.current as HTMLUListElement).offsetWidth
      ));
      setSlideId(prev => prev - 1);
    }
  };

  return (
    <div className="main__banner banner-container">
      <div className="banner-container__slider slider">
        <button
          className="slider__button"
          type="button"
          onClick={handlePrev}
        >
          <Icon iconName="arrowLeft" classNames="slider__button-icon" />
        </button>
        <div
          className="slider__banner"
        >
          <ul
            className="slider__banner-list"
            style={
              {
                transform: `translateX(${translateX}px)`,
                transition: 'all 1500ms',
              }
            }
            ref={containerRef}
          >
            {images.map(([key, value]) => (
              <li
                className="slider__banner-item"
                key={key}
              >
                <Link to={key} className="slider__banner-link">
                  <img
                    src={value}
                    alt={key}
                    className="slider__banner-img"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <button
          className="slider__button"
          type="button"
          onClick={handleNext}
        >
          <Icon iconName="arrowRight" classNames="slider__button-icon" />
        </button>
      </div>
      <div className="banner-container__pagination pagination">
        {images.map((item, index) => (
          <span
            key={item[0]}
            className={cn(
              'pagination__part',
              { 'pagination__part--active': index === slideId },
            )}
          />
        ))}
      </div>
    </div>
  );
};
