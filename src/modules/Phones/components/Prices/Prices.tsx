import React, { ComponentPropsWithoutRef, FC } from 'react';
import cn from 'classnames';

import { Skeleton } from '../../../shared/ui/Skeleton';
import { Text } from '../../../shared/ui/Text';
import classes from './prices.module.scss';

type Props = ComponentPropsWithoutRef<typeof Skeleton | 'div'> & {
  isLoaded: boolean;
  regularPrice: number;
  discountPrice?: number;
};

export const Prices: FC<Props> = ({
  discountPrice,
  isLoaded,
  regularPrice,
  className,
  ...props
}) => {
  if (!isLoaded) {
    return (
      <Skeleton
        {...props}
        className={cn(classes.prices, classes.prices_skeleton, className)}
      />
    );
  }

  return (
    <div {...props} className={cn(classes.prices, className)}>
      <Text.H2 className={classes.prices__actual}>
        ${Boolean(discountPrice) ? discountPrice : regularPrice}
      </Text.H2>
      {Boolean(discountPrice) && (
        <Text.H3 className={classes.prices__regular}>${regularPrice}</Text.H3>
      )}
    </div>
  );
};
