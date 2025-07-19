import React from 'react';
import productsData from '../../../../../public/api/products.json';
import styles from './ProductId.module.scss';

type Props = {
  name: string;
};

export const ProductId: React.FC<Props> = ({ name }) => {
  const product = productsData.find(item => item.name === name);

  if (!product) {
    return null;
  }

  return <p className={styles.productId}>ID: {product.id}</p>;
};
