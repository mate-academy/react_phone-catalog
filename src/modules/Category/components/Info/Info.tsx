import React, { ComponentPropsWithoutRef, FC } from 'react';
import cn from 'classnames';

import { Skeleton } from '../../../shared/ui/Skeleton';
import { Text } from '../../../shared/ui/Text';
import classes from './info.module.scss';

type Props = ComponentPropsWithoutRef<'div'> & {
  numberOfProducts: number;
  isLoaded: boolean;
  title: string;
};

export const Info: FC<Props> = ({
  className,
  numberOfProducts,
  isLoaded,
  title,
  ...props
}) => {
  return (
    <div {...props} className={cn(classes.info, className)}>
      <Text.H1 className={classes.info__title} element="h1">
        {title}
      </Text.H1>

      {isLoaded ? (
        <Text element="span" className={classes.info__productsCount}>
          {numberOfProducts} models
        </Text>
      ) : (
        <Skeleton
          className={cn(
            classes.info__productsCount,
            classes.info__productsCount_loading,
          )}
        />
      )}
    </div>
  );
};
