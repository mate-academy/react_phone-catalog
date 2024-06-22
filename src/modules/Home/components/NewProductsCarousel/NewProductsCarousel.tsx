/* eslint-disable @typescript-eslint/indent */
import React, { ComponentPropsWithoutRef, FC } from 'react';

import {
  selectNewProducts,
  useProducts,
} from '../../../../app/features/products';
import { ProductCard } from '../../../shared/ProductCard';
import { ProductsCarousel } from '../../../shared/ProductsCarousel';

type Props = ComponentPropsWithoutRef<'div'>;

const skeletons = Array.from(Array(4), (_, i) => (
  <ProductCard.Skeleton key={i} />
));

export const NewProductsCarousel: FC<Props> = props => {
  const { products, status } = useProducts(selectNewProducts);
  const isSuccess = status === 'fulfilled';

  return (
    <ProductsCarousel {...props} carouselTitle="Brand new models">
      {isSuccess
        ? products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        : skeletons}
    </ProductsCarousel>
  );
};
