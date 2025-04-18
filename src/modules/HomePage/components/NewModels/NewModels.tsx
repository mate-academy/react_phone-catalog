import styles from './NewModels.module.scss';
import React from 'react';
import { Product } from '../../../../shared/types/Product';
import classNames from 'classnames';
import { ProductsGallery } from '../../../../components/ProductsGallery';

type Props = {
  products: Product[];
  className?: string;
};

export const NewModels: React.FC<Props> = ({ products, className }) => {
  const newModels = products.filter(product => product.year >= 2022);

  return (
    <div className={classNames(styles.NewModels, className)}>
      <ProductsGallery products={newModels} title={'New models'} />
    </div>
  );
};
