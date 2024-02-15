import React, { memo } from 'react';
import { ProductsCarousel, ProductsCarouselProps } from '../ProductsCarousel/ProductsCarousel';
import { useRequest } from '../../../../enhancers/hooks/request';
import { getProducts } from '../../../../api/products/client/products';
import { QueryOptions, SortQuery } from '../../../../api/products/server/types';

interface Props extends Omit<ProductsCarouselProps, 'products' | 'loading'> {
  sortQuery?: SortQuery,
  page?: number
  perPage?: number,
  setError?: (error: string) => void
}

export const ProductsCarouselWithSortedProducts: React.FC<Props> = memo(({
  name,
  sortQuery = SortQuery.Unsorted,
  page = 1,
  perPage = 16,
  setError = () => {},
  ...carouselProps
}) => {
  const hotPricesOptions: QueryOptions = {
    sortQuery,
    pagination: { page, perPage },
  };

  const [{ products }, loading, error] = useRequest(
    () => getProducts(hotPricesOptions),
    [sortQuery, page, perPage],
    { products: [] },
  );

  if (error) {
    setError(error);
  }

  return (
    <ProductsCarousel
      name={name}
      products={products.slice(0, 8)}
      loading={loading}
      {...carouselProps}
    />
  );
});
