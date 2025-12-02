import { ProductDetails } from '@/types/ProductDetails';
import React from 'react';
import styles from './ProductPage.module.scss';

type ProductConfiguratorProps = {
  product?: ProductDetails;
};

const ProductConfigurator: React.FC<ProductConfiguratorProps> = ({
  product,
}) => {
  return (
    <div className={styles.productConfigurator}>
      <div className={styles.productConfigurator_controls}></div>
      <div className={styles.productConfigurator_id}></div>
    </div>
  );
};

export default ProductConfigurator;
