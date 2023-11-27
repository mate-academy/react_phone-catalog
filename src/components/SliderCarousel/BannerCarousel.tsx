import './BannerCarousel.scss';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Arrow } from '../Buttons/Arrow/Arrow';
import { ArrowTypes } from '../../ArrowTypes';

const images = [
  '/img/banners/banner-1.png',
  '/img/banners/banner-2.png',
  '/img/banners/banner-3.png',
  '/img/banners/banner-4.png',
  '/img/banners/banner-5.png',
  '/img/banners/banner-6.png',
];

const slideDuration = 600;
const autoSlideDuration = 2000;
const itemWidth = 1040;

export const BannerCarousel = () => {
  const [currentPosition, setCurrentPosition] = useState(0);

  const maxPosTransform = (images.length - 1) * itemWidth;

  const moveCarousel = (moveNext: boolean) => {
    let needMove = moveNext
      ? currentPosition + itemWidth
      : currentPosition - itemWidth;

    if (needMove >= maxPosTransform) {
      needMove = maxPosTransform;
    }

    if (needMove < 0 || currentPosition === maxPosTransform) {
      needMove = 0;
    }

    setCurrentPosition(needMove);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      moveCarousel(true);
    }, autoSlideDuration);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  return (
    <div className="carousel">
      <div className="carousel__gallery">
        <div className="carousel__slide">
          <Arrow
            arrowType={ArrowTypes.left}
            isActive={currentPosition !== 0}
            isBig
            OnClick={() => moveCarousel(false)}
          />
        </div>

        <div className="carousel__swap">
          <ul
            className="carousel__list"
            style={{
              transition: `transform ${slideDuration}ms`,
              transform: `translateX(-${currentPosition}px)`,
            }}
          >
            {images.map((image, index) => (
              <li key={image}>
                <img
                  className="carousel__image"
                  src={image}
                  alt={index.toString()}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="carousel__slide">
          <Arrow
            arrowType={ArrowTypes.right}
            isActive={currentPosition < maxPosTransform}
            isBig
            OnClick={() => moveCarousel(true)}
          />
        </div>
      </div>

      <div className="carousel__pagination">
        {[...Array(images.length)].map((_, index) => (
          <div className={classNames(
            'carousel__dot',
            {
              'carousel__dot--active': currentPosition / itemWidth === index,
            },
          )}
          />
        ))}
      </div>
    </div>
  );
};
