import { useMemo } from 'react';
import { Product } from '../types/Product';
import { containQuery } from '../utils/containQuery';

export const useFavouriteItems = (
  products: Product[],
  query: string,
) => {
  const filteredByQuery = useMemo(() => {
    return query
      ? products.filter(product => containQuery(product, query))
      : products;
  }, [products, query]);

  return filteredByQuery;
};

export const useFavouriteItemsTotal = (
  products: Product[],
  query: string,
) => {
  const preparedFavouriteItems = useFavouriteItems(products, query);

  const preparedFavouriteItemsTotal = useMemo(() => {
    return preparedFavouriteItems.length;
  }, [preparedFavouriteItems]);

  return preparedFavouriteItemsTotal;
};
