import React, { ComponentProps, FC } from 'react';
import cn from 'classnames';

import { Skeleton } from '../ui/Skeleton';
import classes from './productCardSkeleton.module.scss';

type Props = ComponentProps<'div'>;

export const ProductCardSkeleton: FC<Props> = ({ className }) => {
  return (
    <div className={cn(classes.card, className)}>
      <Skeleton className={classes.card__img} />
      <Skeleton className={classes.card__name} />
      <Skeleton className={classes.card__price} />
      <Skeleton className={classes.card__specs} />
      <Skeleton className={classes.card__footer} />
    </div>
  );
};
