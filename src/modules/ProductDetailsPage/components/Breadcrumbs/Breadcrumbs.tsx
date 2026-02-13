import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../../../types';
import styles from './Breadcrumbs.module.scss';

interface Props {
  product: Product;
}

export const Breadcrumbs: React.FC<Props> = ({ product }) => {
  const categoryName =
    product.category === 'phones'
      ? 'Phones'
      : product.category === 'tablets'
        ? 'Tablets'
        : product.category === 'accessories'
          ? 'Accessories'
          : 'Products';

  return (
    <nav className={styles.breadcrumbs}>
      <Link
        to="/"
        className={`${styles.breadcrumbs__link} ${styles.breadcrumbs__home}`}
      >
        <img src={'img/icons/icon-home.png'} alt="Home" />
      </Link>
      <span className={styles.breadcrumbs__separator}>
        <img src={'img/icons/icon-right.png'} alt="Arrow Right" />
      </span>
      <Link to={`/${product.category}`} className={styles.breadcrumbs__link}>
        {categoryName}
      </Link>
      <span className={styles.breadcrumbs__separator}>
        <img src={'img/icons/icon-right.png'} alt="Arrow Right" />
      </span>
      <span className={styles.breadcrumbs__current}>{product.name}</span>
    </nav>
  );
};
