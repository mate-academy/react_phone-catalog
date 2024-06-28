import React, { FC } from 'react';

import { useAppSelector } from '../../app/hooks';
import { selectFavourites } from '../../app/features/favourites';
import { Container } from '../shared/Container';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { Text } from '../shared/ui/Text';
import { useFetchedData } from '../../hooks/useFetchedData';
import { fetchProducts, selectProducts } from '../../app/features/products';
import { Products } from './components/Products';
import classes from './favourites.module.scss';

type Props = {};

export const Favourites: FC<Props> = ({}) => {
  const { items: favourites } = useAppSelector(selectFavourites);
  const { products, status } = useFetchedData(fetchProducts(), selectProducts);
  const isLoaded = status === 'fulfilled';

  const favouriteProducts = products.filter(product =>
    favourites.includes(product.itemId),
  );

  return (
    <Container className={classes.page}>
      <Breadcrumbs className={classes.page__breadcrumbs} />
      <Text.H1 element="h1" className={classes.page__title}>
        Favourites
      </Text.H1>
      {Boolean(favouriteProducts.length) && (
        <Text className={classes.page__itemCount}>
          {favouriteProducts.length} items
        </Text>
      )}
      <Products
        expectedNumberOfProducts={favourites.length}
        className={classes.page__products}
        isLoaded={isLoaded}
        products={favouriteProducts}
      />
    </Container>
  );
};
