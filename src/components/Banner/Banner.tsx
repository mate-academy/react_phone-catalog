import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import './Banner.scss';
import classNames from 'classnames';
import { BannerImage } from '../../types/BannerImage';
import { BANNER_IMAGE_ROOT } from '../../helpers/constants';
import { Icon } from '../Icon';
import { IconType } from '../../types/IconTypes';
import { ScreenSizeContext, ScreenType } from '../ScreenSizeProvider';

type Props = {
  images: BannerImage[];
};

export const Banner: React.FC<Props> = ({ images }) => {
  const screenSize = useContext(ScreenSizeContext);
  const [visibleImage, setVisibleImage] = useState(0);
  const sliderWidth = 100 * images.length;
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);

  const slideToPrev = useCallback(() => {
    if (visibleImage === 0) {
      setVisibleImage(images.length - 1);
    } else {
      setVisibleImage(visibleImage - 1);
    }
  }, [visibleImage, images]);

  const slideToNext = useCallback(() => {
    if (visibleImage === images.length - 1) {
      setVisibleImage(0);
    } else {
      setVisibleImage(visibleImage + 1);
    }
  }, [visibleImage, images]);

  const timerId = useRef(0);

  useEffect(() => {
    window.clearTimeout(timerId.current);

    timerId.current = window.setTimeout(slideToNext, 5000);
  }, [visibleImage, slideToNext]);

  const handleTouchStart = useCallback(
    (event: React.TouchEvent<HTMLUListElement>) => {
      setStartX(event.touches[0].clientX);
    },
    [],
  );

  const handleTouchMove = useCallback(
    (event: React.TouchEvent<HTMLUListElement>) => {
      setEndX(event.touches[0].clientX);
    },
    [],
  );

  const handleTouchEnd = useCallback(() => {
    if (endX - startX > 50) {
      slideToPrev();
    } else if (startX - endX > 50) {
      slideToNext();
    }
  }, [startX, endX, slideToNext, slideToPrev]);

  return (
    <section className="banner">
      <div className="banner__content">
        {screenSize !== ScreenType.isMobile && (
          <button
            className="banner__button banner__button--left"
            aria-label="banner button left"
            type="button"
            onClick={slideToPrev}
          >
            <Icon iconType={IconType.arrowLeft} />
          </button>
        )}
        <div className="banner__wrapper">
          <ul
            className="banner__slider"
            style={{
              width: `${sliderWidth}%`,
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {images.map(({ name, path }, index) => (
              <li
                key={name}
                className={classNames('banner__item', {
                  'banner__item--active': visibleImage === index,
                })}
                style={{
                  order: (index - visibleImage + images.length) % images.length,
                }}
              >
                <img
                  src={`${BANNER_IMAGE_ROOT}/${path}`}
                  alt={`${name} banner`}
                  className="banner__img"
                />
              </li>
            ))}
          </ul>
        </div>

        {screenSize !== ScreenType.isMobile && (
          <button
            className="banner__button banner__button--right"
            aria-label="banner button rigth"
            type="button"
            onClick={slideToNext}
          >
            <Icon iconType={IconType.arrowRight} />
          </button>
        )}
      </div>
      <div className="banner__indicators">
        {images.map(({ name }, imageIndex) => (
          <button
            key={name}
            className={classNames('banner__indicator', {
              'banner__indicator--active': visibleImage === imageIndex,
            })}
            type="button"
            aria-label="banner indicator"
            onClick={() => setVisibleImage(imageIndex)}
          />
        ))}
      </div>
    </section>
  );
};
