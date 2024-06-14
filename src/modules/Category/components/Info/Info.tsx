import React, { ComponentProps, FC } from 'react';
import cn from 'classnames';

import { Category, QueryStatus } from '../../../../types';
import { capitalize } from '../../../../utils/capitalize';
import { Container } from '../../../shared/Container';
import { Skeleton } from '../../../shared/ui/Skeleton';
import { Text } from '../../../shared/ui/Text';
import { TITLE } from './variables';
import classes from './info.module.scss';

type Props = ComponentProps<typeof Container> & {
  category: Category;
  numberOfProducts: number;
  status: QueryStatus;
};

export const Info: FC<Props> = ({
  className,
  category,
  numberOfProducts,
  status,
  ...props
}) => {
  return (
    <Container {...props} className={cn(classes.info, className)}>
      <Text.H1 className={classes.info__title} element="h1">
        {capitalize(TITLE[category])}
      </Text.H1>

      {status === 'fulfilled' ? (
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
    </Container>
  );
};
