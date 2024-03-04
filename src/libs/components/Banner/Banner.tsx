/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import { Link } from 'react-router-dom';
import {
  useMemo, useRef, useState,
} from 'react';

import { BANNER_IMAGES } from '../../constants';

import { Icon } from '../Icon';

import './Banner.scss';

export const Banner = () => {
  const firstSlideId = 1;
  const [slideId, setSlideId] = useState(firstSlideId);
  const containerRef = useRef<HTMLUListElement>(null);

  const images = Object.entries(BANNER_IMAGES);
  const imagesCount = images.length;
  const lastSlideId = imagesCount;

  const translateX = useMemo(() => {
    if (!containerRef.current) {
      return 0;
    }

    return (-(slideId - 1)
    * (containerRef.current as HTMLUListElement).offsetWidth);
  }, [slideId]);

  const handleNext = () => {
    setSlideId(prev => {
      if (prev === lastSlideId) {
        return firstSlideId;
      }

      return (prev + 1);
    });
  };

  const handlePrev = () => {
    setSlideId(prev => {
      if (prev === 1) {
        return lastSlideId;
      }

      return (prev - 1);
    });
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
          <button
            type="button"
            key={item[0]}
            className={cn(
              'pagination__part',
              { 'pagination__part--active': index + 1 === slideId },
            )}
            onClick={() => setSlideId(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};
