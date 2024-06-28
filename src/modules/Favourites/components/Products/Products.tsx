/* eslint-disable  @typescript-eslint/indent */
import React, { ComponentPropsWithoutRef, FC, useMemo } from 'react';

import { Product } from '../../../../types';
import { ItemGrid } from '../../../shared/ItemGrid';
import { Text } from '../../../shared/ui/Text';
import { ProductCard } from '../../../shared/ProductCard';

type Props = Omit<
  ComponentPropsWithoutRef<typeof ItemGrid | typeof Text.H3>,
  'items'
> & {
  products: Product[];
  isLoaded: boolean;
  expectedNumberOfProducts: number;
};

export const Products: FC<Props> = ({
  isLoaded,
  products,
  expectedNumberOfProducts,
  ...props
}) => {
  const skeletons = useMemo(
    () =>
      Array.from(Array(expectedNumberOfProducts), (_, i) => (
        <ProductCard.Skeleton key={i} />
      )),
    [expectedNumberOfProducts],
  );

  if ((isLoaded && !products.length) || expectedNumberOfProducts === 0) {
    return <Text.H3 {...props}>You do not have any favourite products</Text.H3>;
  }

  const items = isLoaded
    ? products.map(product => (
        <ProductCard showFullPrice={true} product={product} key={product.id} />
      ))
    : skeletons;

  return <ItemGrid {...props} items={items} />;
};
