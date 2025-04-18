import styles from './HotPrices.module.scss';
import React from 'react';
import { Product } from '../../../../shared/types/Product';
import classNames from 'classnames';
import { ProductsGallery } from '../../../../components/ProductsGallery';

type Props = {
  products: Product[];
  className?: string;
};

export const HotPrices: React.FC<Props> = ({ products, className }) => {
  const hotPrices = products
    .filter(product => product.price !== product.fullPrice)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

  return (
    <div className={classNames(styles.NewModels, className)}>
      <ProductsGallery products={hotPrices} title={'Hot prices'} />
    </div>
  );
};
