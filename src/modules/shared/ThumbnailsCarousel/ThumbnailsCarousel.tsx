import React, { ComponentPropsWithoutRef, FC } from 'react';
import cn from 'classnames';

import { useThumbnailsCarousel } from './ThumbnailsCarouselContext';
import classes from './thumbnailsCarousel.module.scss';

type Props = ComponentPropsWithoutRef<'div'>;

export const ThumbnailsCarousel: FC<Props> = ({ className, ...props }) => {
  const { carousel, slides } = useThumbnailsCarousel();
  const [wrapperRef] = carousel;

  return (
    <div
      {...props}
      className={cn(classes.carousel, className)}
      ref={wrapperRef}
    >
      <div className={classes.carousel__content}>
        {slides.map((slide, index) => (
          <div className={classes.carousel__slide} key={index}>
            {slide}
          </div>
        ))}
      </div>
    </div>
  );
};
