/* eslint-disable @typescript-eslint/indent */
import React, { ComponentProps, FC, useMemo } from 'react';

import classes from './products.module.scss';
import { Container } from '../../../shared/Container';
import { ProductCard } from '../../../shared/ProductCard';
import cn from 'classnames';
import {
  SORT_SELECT_DATA,
  SORT_SELECT_DEFAULT_KEY,
  TAKE_SELECT_DATA,
  isSortSelectKey,
  isTakeSelectKey,
} from '../../variables';
import { useSingleSearchParam } from '../../../../hooks/useSingleSearchParam';
import { getValidNumber } from '../../../../helpers/getValidNumber';
import { Product, QueryStatus } from '../../../../types';
import { getInRange } from '../../../../helpers/getInRange';

type Props = ComponentProps<typeof Container> & {
  products: Product[];
  status: QueryStatus;
};

export const Products: FC<Props> = ({
  products,
  status,
  className,
  ...props
}) => {
  const [takeSearchParam] = useSingleSearchParam('take');
  const [pageSearchParam] = useSingleSearchParam('page');
  const [sortSearchParam] = useSingleSearchParam(
    'sort',
    SORT_SELECT_DEFAULT_KEY,
  );

  const take = (() => {
    if (!isTakeSelectKey(takeSearchParam)) {
      return +TAKE_SELECT_DATA['16'];
    }

    switch (TAKE_SELECT_DATA[takeSearchParam]) {
      case TAKE_SELECT_DATA['4']:
        return +TAKE_SELECT_DATA['4'];
      case TAKE_SELECT_DATA['8']:
        return +TAKE_SELECT_DATA['8'];
      case TAKE_SELECT_DATA.all:
        return products.length;
      default:
        return +TAKE_SELECT_DATA['16'];
    }
  })();

  const lastPage = getValidNumber(
    Math.ceil((products.length || take) / take),
    1,
  );
  const page = getInRange(getValidNumber(pageSearchParam, 1), 1, lastPage);
  const start = take * (page - 1);
  const end = start + take;
  const productsToShow = [...products]
    .sort((a, b) => {
      if (!isSortSelectKey(sortSearchParam)) {
        return 0;
      }

      switch (SORT_SELECT_DATA[sortSearchParam]) {
        case SORT_SELECT_DATA.age:
          return b.year - a.year;
        case SORT_SELECT_DATA.price:
          return a.price - b.price;
        case SORT_SELECT_DATA.title:
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    })
    .slice(start, end);

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
        ? productsToShow.map(product => (
            <ProductCard
              className={classes.container__card}
              product={product}
              key={product.id}
            />
          ))
        : skeletons}
    </Container.Grid>
  );
};
