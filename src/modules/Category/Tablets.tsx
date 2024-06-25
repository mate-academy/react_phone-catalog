/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC } from 'react';

import { selectTablets, useProducts } from '../../app/features/products';
import { Container } from '../shared/Container';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { useCategory } from './hooks/useCategory';
import { Info } from './components/Info';
import { Products } from './components/Products';
import { SearchInput } from './components/SearchInput';
import { Selects } from './components/Selects';
import { Pagination } from './components/Pagination';
import classes from './category.module.scss';

type Props = {};

export const Tablets: FC<Props> = ({}) => {
  const { products, status } = useProducts(selectTablets);
  const { preparedProducts, filteredProducts, numberOfPages } =
    useCategory(products);

  const isLoaded = status === 'fulfilled';

  return (
    <Container className={classes.page}>
      <Breadcrumbs className={classes.page__breadCrumbs} />
      <Info
        numberOfProducts={filteredProducts.length}
        isLoaded={isLoaded}
        title="Tablets"
        className={classes.page__info}
      />
      <Selects className={classes.page__selects} />

      <Products
        isLoaded={isLoaded}
        products={preparedProducts}
        className={classes.page__products}
      />

      {numberOfPages > 1 && (
        <Pagination
          className={classes.page__pagination}
          pageCount={numberOfPages}
        />
      )}
      <SearchInput placeholder="Find tablet" />
    </Container>
  );
};
