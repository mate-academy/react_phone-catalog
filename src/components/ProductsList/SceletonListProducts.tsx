import React from 'react';
import styles from './SceletonListProducts.module.scss';
import SceletonProduct from '../ProductItem/SceletonProduct';

const numbers = Array.from({ length: 10 }, (_, index) => index + 1);

const SceletonListProducts: React.FC = () => {
  return (
    <div className={styles.products}>
      {numbers.map(product => (
        <div key={product} className={styles.products__item}>
          <SceletonProduct />
        </div>
      ))}
    </div>
  );
};

export default SceletonListProducts;
