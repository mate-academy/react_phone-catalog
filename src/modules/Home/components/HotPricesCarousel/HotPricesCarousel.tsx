/* eslint-disable @typescript-eslint/indent */
import React, { ComponentProps, FC } from 'react';

import {
  selectHotPrices,
  useProducts,
} from '../../../../app/features/products';
import { ProductCard } from '../../../shared/ProductCard';
import { ProductsCarousel } from '../../../shared/ProductsCarousel';

type Props = ComponentProps<'div'>;

const skeletons = Array.from(Array(4), (_, i) => (
  <ProductCard.Skeleton key={i} />
));

export const HotPricesCarousel: FC<Props> = props => {
  const { products, status } = useProducts(selectHotPrices);
  const isSuccess = status === 'fulfilled';

  return (
    <ProductsCarousel {...props} carouselTitle="Hot Prices">
      {isSuccess
        ? products.map(product => (
            <ProductCard key={product.id} showFullPrice product={product} />
          ))
        : skeletons}
    </ProductsCarousel>
  );
};
