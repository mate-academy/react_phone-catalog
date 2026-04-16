import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import React from 'react';
import { Product } from '../../../../types/Product';
import { homeIconMap } from '../../config/homeIconMap';
import { useTheme } from '../../../../store/theme/ThemeContext';

type Props = {
  breadcrumb: string;
  currentProduct?: Product;
};

export const Breadcrumbs: React.FC<Props> = ({
  breadcrumb,
  currentProduct,
}) => {
  const { theme } = useTheme();
  const category = currentProduct?.category;

  return (
    <div className={styles.breadcrumbs}>
      <Link to="/" className={styles.homeLink}>
        <img src={homeIconMap[theme]} alt="Home" />
      </Link>
      <img
        src="/img/icon/chevron-arrow-right.svg"
        alt="Arrow Right"
        className={styles.image}
      />

      {currentProduct ? (
        <Link
          to={`/${category}`}
          className={`${styles.currentPage} ${
            currentProduct ? styles.active : ''
          }`}
        >
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
