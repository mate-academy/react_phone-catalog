import React from 'react';
import { Product } from '../../modules/shared/types/Product';
import styles from './Catalog.module.scss';
import { ProductCard } from '../ProductCard';
import classNames from 'classnames';

interface Props {
  products: Product[];
  isDiscountHidden?: boolean;
  className?: string;
}

export const Catalog: React.FC<Props> = ({ products, isDiscountHidden, className }) => {
  return (
    <div className={classNames(styles.grid, className)}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} isDiscountHidden={isDiscountHidden} />
      ))}
    </div>
  );
};
