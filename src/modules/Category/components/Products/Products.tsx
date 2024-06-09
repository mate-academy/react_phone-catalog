/* eslint-disable @typescript-eslint/indent */
import React, { ComponentProps, FC, useMemo } from 'react';

import classes from './products.module.scss';
import { Container } from '../../../shared/Container';
import { ProductCard } from '../../../shared/ProductCard';
import cn from 'classnames';
import { Product, QueryStatus } from '../../../../types';

type Props = ComponentProps<typeof Container> & {
  products: Product[];
  take: number;
  status: QueryStatus;
};

export const Products: FC<Props> = ({
  products,
  status,
  className,
  take,
  ...props
}) => {
  const skeletons = useMemo(
    () =>
      Array.from(Array(take), (_, i) => (
        <ProductCard.Skeleton className={classes.container__card} key={i} />
      )),
    [take],
  );
  const isSuccess = status === 'fulfilled';

  return (
    <Container.Grid {...props} className={cn(classes.container, className)}>
      {isSuccess
        ? products.map(product => (
            <ProductCard
              className={classes.container__card}
              product={product}
              key={product.id}
              showFullPrice={true}
            />
          ))
        : skeletons}
    </Container.Grid>
  );
};
