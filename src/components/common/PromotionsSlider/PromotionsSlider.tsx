import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

import './PromotionsSlider.scss';
import ArrowButton from '../../UI/ArrowButton';
import Placeholder from '../../UI/Placeholder';

interface Props {
  promotions: string[],
  loading?: boolean,
}

export const PromotionsSlider: React.FC<Props> = memo(({ promotions, loading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalId = useRef(-1);

  const slideToNext = useCallback(() => {
    setCurrentIndex(index => {
      const newIndex = index + 1;

      return newIndex > promotions.length - 1 ? 0 : newIndex;
    });
  }, [promotions.length]);

  const slideToPrev = useCallback(() => {
    setCurrentIndex(index => {
      const newIndex = index - 1;

      return newIndex < 0 ? promotions.length - 1 : newIndex;
    });
  }, [promotions.length]);

  useEffect(() => {
    intervalId.current = window.setInterval(() => {
      slideToNext();
    }, 5000)

    return () => clearInterval(intervalId.current);
  })

  return (
    <section className='promotions-slider'>
      <div className='promotions-slider__top'>
        <ArrowButton
          className={'promotions-slider__arrow-button '
            + 'promotions-slider__arrow-button--prev'
          }
          onClick={slideToPrev}
        />

        <div className='promotions-slider__content'>
          {loading && <Placeholder width='100%' height='400px'/>}

          {!loading && (
            <div
              className='promotions-slider__img'
              style={{
                backgroundImage: `url(${promotions[currentIndex]})`
              }}
            />
          )}
        </div>

        <ArrowButton
          className={'promotions-slider__arrow-button '
            + 'promotions-slider__arrow-button--next'
          }
          rotate={180}
          onClick={slideToNext}
        />
      </div>

      <div className='promotions-slider__pagination'>
        {promotions.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className='promotions-slider__pagination-item'
          >
            <div
              className={
                "promotions-slider__pagination-item-inner" + (
                  index === currentIndex
                    ? " promotions-slider__pagination-item-inner--active" : ''
                )}
            />
          </button>
        ))}
      </div>
    </section>
  );
});
