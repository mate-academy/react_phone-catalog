import React, { ComponentPropsWithoutRef, FC } from 'react';
import cn from 'classnames';

import {
  fetchProducts,
  selectProducts,
} from '../../../../app/features/products';
import { useFetchedData } from '../../../../hooks/useFetchedData';
import { Text } from '../../../shared/ui/Text';
import classes from './productId.module.scss';

type Props = ComponentPropsWithoutRef<typeof Text.Small> & {
  productId: string;
};

export const ProductId: FC<Props> = ({ className, productId }) => {
  const { products } = useFetchedData(fetchProducts(), selectProducts);
  const currentProduct = products.find(product => product.itemId === productId);

  return (
    <Text.Small className={cn(classes.productId, className)}>
      ID: {currentProduct?.id ?? '***'}
    </Text.Small>
  );
};
