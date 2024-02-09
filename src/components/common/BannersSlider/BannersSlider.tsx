import React, {
  memo, useCallback, useEffect, useRef, useState,
} from 'react';

import './BannersSlider.scss';
import ArrowButton from '../../UI/buttons/ArrowButton';
import Placeholder from '../../UI/Placeholder';

interface Props {
  banners: string[],
  loading?: boolean,
}

export const BannersSlider: React.FC<Props> = memo(({ banners, loading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalId = useRef(-1);

  const slideToNext = useCallback(() => {
    setCurrentIndex(index => {
      const newIndex = index + 1;

      return newIndex > banners.length - 1 ? 0 : newIndex;
    });
  }, [banners.length]);

  const slideToPrev = useCallback(() => {
    setCurrentIndex(index => {
      const newIndex = index - 1;

      return newIndex < 0 ? banners.length - 1 : newIndex;
    });
  }, [banners.length]);

  useEffect(() => {
    intervalId.current = window.setInterval(() => {
      slideToNext();
    }, 5000);

    return () => clearInterval(intervalId.current);
  }, [slideToNext]);

  return (
    <section className="banners-slider">
      <div className="banners-slider__top">
        <ArrowButton
          className={'banners-slider__arrow-button '
            + 'banners-slider__arrow-button--prev'}
          onClick={slideToPrev}
        />

        <div className="banners-slider__content">
          {loading && <Placeholder width="100%" height="400px" />}

          {!loading && (
            <div
              className="banners-slider__img"
              style={{
                backgroundImage: `url(${banners[currentIndex]})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            />
          )}
        </div>

        <ArrowButton
          className={'banners-slider__arrow-button '
            + 'banners-slider__arrow-button--next'}
          rotate={180}
          onClick={slideToNext}
        />
      </div>

      <div className="banners-slider__pagination">
        {banners.map((_, index) => (
          <button
            type="button"
            aria-label="banners slider pagination"
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="banners-slider__pagination-item"
          >
            <div
              className={
                `banners-slider__pagination-item-inner${index === currentIndex
                  ? ' banners-slider__pagination-item-inner--active' : ''}`
              }
            />
          </button>
        ))}
      </div>
    </section>
  );
});
