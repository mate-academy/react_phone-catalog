import React, { memo } from 'react';
import { ProductsCarousel, ProductsCarouselProps } from '../ProductsCarousel/ProductsCarousel';
import { useRequest } from '../../../../enhancers/hooks/request';
import { getProducts } from '../../../../api/products/client/products';

type Props = Omit<ProductsCarouselProps, 'products' | 'loading'>;

export const ProductsCarouselWithRandomItems: React.FC<Props> = memo(({
  ...restProps
}) => {
  const [{ products }, loading] = useRequest(
    () => getProducts({ randomCount: 16 }), [], { products: [] },
  );

  return (
    <ProductsCarousel products={products} loading={loading} {...restProps} />
  );
});
