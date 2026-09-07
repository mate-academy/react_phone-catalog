import classNames from 'classnames';
import React, { useMemo } from 'react';

import { ProductCategory } from '@sTypes/ProductCategory';
import { useProductsPreload } from '@hooks/useProductsPreload';

import styles from './ProductId.module.scss';

type Props = {
  itemId: string;
  category: ProductCategory;
};

export const ProductId: React.FC<Props> = ({ itemId, category }) => {
  const { products, isLoading } = useProductsPreload();

  const id = useMemo(() => {
    return products[category].find(product => product.itemId === itemId)?.id;
  }, [category, itemId, products]);

  return (
    <span
      className={classNames(styles['product-id'], {
        [styles['product-id--loading']]: isLoading,
      })}
    >
      {id && `ID: ${id}`}
    </span>
  );
};
