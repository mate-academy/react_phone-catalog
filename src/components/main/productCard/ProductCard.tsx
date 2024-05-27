import React from 'react';
import styles from './ProductCard.module.scss';
// import { Product } from '../../types/Product';

// interface Props {
//   product: Product;
// };

export const ProductCard: React.FC = () => {
  // const {
  //   // capacity,
  //   // category,
  //   // color,
  //   // fullPrice,
  //   // id,
  //   // image,
  //   // itemId,
  //   name,
  //   // price,
  //   // ram,
  //   // screen,
  //   // year,
  // } = product;
  return (
    <>
      <div className={styles['productCard']}>
      <img className={styles['productCard__picture']} />
        <p>product name: </p>
      </div>
    </>
  );
};
