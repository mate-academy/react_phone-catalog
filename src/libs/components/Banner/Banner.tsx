/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useMemo, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import { BANNER_IMAGES } from '../../constants';

import { Icon } from '../Icon';

import './Banner.scss';

type Props = {
  classNames?: string;
};

export const Banner: React.FC<Props> = ({ classNames }) => {
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

    return (
      -(slideId - 1) * (containerRef.current as HTMLUListElement).offsetWidth
    );
  }, [slideId]);

  const handleNext = () => {
    setSlideId(prev => {
      if (prev === lastSlideId) {
        return firstSlideId;
      }

      return prev + 1;
    });
  };

  const handlePrev = () => {
    setSlideId(prev => {
      if (prev === 1) {
        return lastSlideId;
      }

      return prev - 1;
    });
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
  });

  return (
    <div className={cn('banner-container', classNames)}>
      <div className="banner-container__slider slider" {...swipeHandlers}>
        <button className="slider__button" type="button" onClick={handlePrev}>
          <Icon iconName="arrowLeft" classNames="slider__button-icon" />
        </button>

        <div className="slider__banner-container">
          <ul
            className="slider__banner-list"
            style={{
              transform: `translateX(${translateX}px)`,
              transition: 'all 1500ms',
            }}
            ref={containerRef}
          >
            {images.map(([key, value]) => (
              <li className="slider__banner-item" key={key}>
                <Link to={key} className="slider__banner-link">
                  <picture className="slider__banner-img">
                    <source
                      srcSet={value.mobile}
                      media="(max-width: 639px)"
                      className="
                      slider__banner-img
                      slider__banner-img--mobile
                      "
                    />
                    <img
                      src={value.general}
                      alt={key}
                      className="slider__banner-img"
                    />
                  </picture>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <button className="slider__button" type="button" onClick={handleNext}>
          <Icon iconName="arrowRight" classNames="slider__button-icon" />
        </button>
      </div>
      <div className="banner-container__pagination pagination">
        {images.map((item, index) => (
          <button
            type="button"
            key={item[0]}
            className={cn('pagination__part', {
              'pagination__part--active': index + 1 === slideId,
            })}
            onClick={() => setSlideId(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};
