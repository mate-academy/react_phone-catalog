import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import React from 'react';
import { Product } from '../../../../types/Product';

type Props = {
  breadcrumb: string;
  currentProduct?: Product;
};

export const Breadcrumbs: React.FC<Props> = ({
  breadcrumb,
  currentProduct,
}) => {
  const category = currentProduct?.category;

  return (
    <div className={styles.breadcrumbs}>
      <Link to="/" className={styles.homeLink}>
        <img src="/img/icon/home.svg" alt="Home" />
      </Link>
      <img
        src="/img/icon/chevron-arrow-right.svg"
        alt="Arrow Right"
        className={styles.image}
      />

      {currentProduct ? (
        <Link to={`/${category}`} className={styles.currentPage}>
          {breadcrumb}
        </Link>
      ) : (
        <span className={styles.currentPage}>{breadcrumb}</span>
      )}

      {currentProduct && (
        <>
          <img
            src="/img/icon/chevron-arrow-right.svg"
            alt="Arrow Right"
            className={styles.image}
          />
          <span className={styles.currentProduct}>{currentProduct.name}</span>
        </>
      )}
    </div>
  );
};
