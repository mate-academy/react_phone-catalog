/* eslint-disable @typescript-eslint/indent */
import React, { ComponentPropsWithoutRef, FC } from 'react';

import { QueryStatus } from '../../types/Query';
import { ProductCard } from '../shared/ProductCard';
import { Product } from '../../types';
import { ProductsCarousel } from '../shared/ProductsCarousel';

type Props = Omit<
  ComponentPropsWithoutRef<typeof ProductsCarousel>,
  'children' | 'carouselTitle'
> & {
  status: QueryStatus;
  products: Product[];
};

const skeletons = Array.from(Array(4), (_, i) => (
  <ProductCard.Skeleton key={i} />
));

const getUniqueRandomItems = (
  n: number,
  min: number,
  max: number,
): number[] => {
  const expectedLength = max - min;

  if (expectedLength < n) {
    return Array.from(Array(expectedLength), (_, i) => min + i);
  }

  const numbers = new Set<number>();

  while (numbers.size < n) {
    const randomNumber = min + Math.floor(Math.random() * expectedLength);

    numbers.add(randomNumber);
  }

  return Array.from(numbers);
};

export const SuggestedProducts: FC<Props> = ({
  products,
  status,
  ...props
}) => {
  const isSuccess = status === 'fulfilled';
  const randomIndexes = getUniqueRandomItems(10, 0, products.length);

  return (
    <ProductsCarousel {...props} carouselTitle="You may also like">
      {isSuccess
        ? randomIndexes.map(randomIndex => (
            <ProductCard product={products[randomIndex]} key={randomIndex} />
          ))
        : skeletons}
    </ProductsCarousel>
  );
};
