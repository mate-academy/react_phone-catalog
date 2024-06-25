/* eslint-disable  @typescript-eslint/indent */
import React, { ComponentPropsWithRef, FC } from 'react';
import cn from 'classnames';

import { ThumbnailsCarousel } from '../../../shared/ThumbnailsCarousel';
import { Container } from '../../../shared/Container';
import { Skeleton } from '../../../shared/ui/Skeleton';
import classes from './display.module.scss';

type Props = ComponentPropsWithRef<typeof Container.Grid> & {
  images: string[];
  isLoaded: boolean;
  info: React.ReactNode;
  extraSlot?: React.ReactNode;
};

const skeletons = Array.from(Array(5), (_, i) => (
  <Skeleton
    key={i}
    className={cn(classes.display__slide, classes.display__slide_skeleton)}
  />
));

export const Display: FC<Props> = ({
  images,
  isLoaded,
  info,
  className,
  extraSlot,
  ...props
}) => {
  const slides = isLoaded
    ? images.map((image, i) => (
        <img className={classes.display__slide} key={i} src={image} alt={''} />
      ))
    : skeletons;

  return (
    <Container.Grid {...props} className={cn(classes.display, className)}>
      <ThumbnailsCarousel slides={slides}>
        <ThumbnailsCarousel.Carousel className={classes.display__carousel} />
        <ThumbnailsCarousel.Thumbnails
          className={classes.display__thumbnails}
          Thumbnail={({ children, isSelected, onClick }) => (
            <button
              onClick={onClick}
              className={cn(classes.display__thumbnail, {
                [classes.display__thumbnail_selected]: isSelected,
              })}
            >
              {children}
            </button>
          )}
        />
      </ThumbnailsCarousel>
      <div className={classes.display__info}>{info}</div>
      {extraSlot && (
        <div className={classes.display__extraSlot}>{extraSlot}</div>
      )}
    </Container.Grid>
  );
};
