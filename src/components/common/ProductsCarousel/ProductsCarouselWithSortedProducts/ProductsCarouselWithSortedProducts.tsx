import React, { memo } from 'react';
import { ProductsCarousel, ProductsCarouselProps } from '../ProductsCarousel/ProductsCarousel';
import { useRequest } from '../../../../enhancers/hooks/request';
import { getProducts } from '../../../../api/products/client/products';
import { QueryOptions, SortQuery } from '../../../../api/products/server/types';

interface Props extends Omit<ProductsCarouselProps, 'products' | 'loading'> {
  sortQuery?: SortQuery,
  page?: number
  perPage?: number,
}

export const ProductsCarouselWithSortedProducts: React.FC<Props> = memo(({
  name,
  sortQuery = SortQuery.Unsorted,
  page = 1,
  perPage = 16,
  ...carouselProps
}) => {
  const hotPricesOptions: QueryOptions = {
    sortQuery,
    pagination: { page, perPage }
  };

  const [{ products }, loading] = useRequest(
    () => getProducts(hotPricesOptions),
    [sortQuery, page, perPage],
    { products: [] },
  );

  return (
    <ProductsCarousel
      name={name}
      products={products}
      loading={loading}
      {...carouselProps}
    />
  );
});
