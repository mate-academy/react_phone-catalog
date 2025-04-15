import React, { ReactNode } from 'react';
import './Carousel.scss';
import classNames from 'classnames';
import { useCarousel } from './useCarousel';
import { useCarouselContext } from './CarouselContext';

type Props = {
  children: ReactNode;
};

export const Carousel: React.FC<Props> = ({ children }) => {
  const { contentRef, canScrollLeft, canScrollRight, scrollContent } =
    useCarousel();
  const { isInProductDetails } = useCarouselContext();

  return (
    <div
      className={classNames('carousel', {
        'carousel--product-details': isInProductDetails,
      })}
    >
      <div className="carousel__arrows">
        <button
          onClick={() => scrollContent('left')}
          className={classNames(
            'carousel__arrows-arrow',
            'carousel__arrows-arrow--left',
            'icon',
            'icon--arrow',
            {
              'carousel__arrows-arrow--disabled': !canScrollLeft,
            },
          )}
          style={{
            transform: canScrollLeft ? 'rotate(180deg)' : 'none',
            backgroundImage: `url(img/icons/icon-arrow${canScrollLeft ? '-active' : ''}.svg)`,
          }}
          disabled={!canScrollLeft}
        ></button>

        <button
          onClick={() => scrollContent('right')}
          className={classNames(
            'carousel__arrows-arrow',
            'carousel__arrows-arrow--right',
            'icon',
            'icon--arrow',
            {
              'carousel__arrows-arrow--disabled': !canScrollRight,
            },
          )}
          style={{
            backgroundImage: `url(img/icons/icon-arrow${canScrollRight ? '-active' : ''}.svg)`,
            transform: !canScrollRight ? 'rotate(180deg)' : 'none',
          }}
          disabled={!canScrollRight}
        ></button>
      </div>

      <div className="carousel__content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
};
