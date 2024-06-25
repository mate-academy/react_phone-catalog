/* eslint-disable  @typescript-eslint/indent */
import React, { ComponentPropsWithoutRef, FC } from 'react';

import { Container } from '../../../shared/Container';
import { ProductCard } from '../../../shared/ProductCard';
import { Product } from '../../../../types';
import { ItemGrid } from '../../../shared/ItemGrid';
import { Text } from '../../../shared/ui/Text';

type Props = ComponentPropsWithoutRef<typeof Container | typeof Text.H3> & {
  products: Product[];
  isLoaded: boolean;
};

const skeletons = Array.from(Array(4), (_, i) => (
  <ProductCard.Skeleton key={i} />
));

export const Products: FC<Props> = ({ products, isLoaded, ...props }) => {
  if (isLoaded && !products.length) {
    return (
      <Text.H3 {...props} element="p">
        No products were found
      </Text.H3>
    );
  }

  const items = isLoaded
    ? products.map(product => (
        <ProductCard showFullPrice={true} product={product} key={product.id} />
      ))
    : skeletons;

  return <ItemGrid {...props} items={items} />;
};
