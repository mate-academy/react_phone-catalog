import React, { FC } from 'react';

import { Selects } from './components/Selects';
import { Info } from './components/Info';
import { Pagination } from './components/Pagination';
import { Products } from './components/Products';
import { useCategory } from './hooks/useCategory';
import { SELECT_CATEGORY, useProducts } from '../../app/features/products';
import classes from './category.module.scss';

type Props = {};

export const Category: FC<Props> = ({}) => {
  const category = useCategory();
  const { products, status } = useProducts(SELECT_CATEGORY[category]);

  return (
    <div className={classes.page}>
      <Info
        numberOfProducts={products.length}
        status={status}
        category={category}
        className={classes.page__info}
      />
      <Selects className={classes.page__selects} />
      <Products
        status={status}
        products={products}
        className={classes.page__products}
      />
      {Boolean(products.length) && (
        <Pagination
          numberOfProducts={products.length}
          className={classes.page__pagination}
        />
      )}
    </div>
  );
};
