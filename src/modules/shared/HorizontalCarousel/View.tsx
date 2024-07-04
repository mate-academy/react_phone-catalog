import React, { ComponentPropsWithoutRef, FC, ReactNode } from 'react';
import cn from 'classnames';

import { useHorizontalCarousel } from './HorizontalCarouselContext';
import classes from './horizontalCarousel.module.scss';

type Props = ComponentPropsWithoutRef<'div'> & {
  slides: ReactNode[];
};

export const View: FC<Props> = ({ className, children, slides, ...props }) => {
  const {
    carouselApi: [ref],
  } = useHorizontalCarousel();

  return (
    <div {...props} className={cn(classes.carousel, className)} ref={ref}>
      <ul className={classes.carousel__container}>
        {slides.map((slide, index) => (
          <li key={index} className={classes.carousel__slide}>
            {slide}
          </li>
        ))}
      </ul>
    </div>
  );
};
