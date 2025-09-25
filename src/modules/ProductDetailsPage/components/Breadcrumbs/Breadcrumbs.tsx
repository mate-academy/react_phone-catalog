import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductDetails } from '../../../../types';
import { CATEGORY_NAMES } from '../../../shared/constants/categories';
import styles from './Breadcrumbs.module.scss';

interface Props {
  product: ProductDetails;
}

export const Breadcrumbs: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();

  const categoryName = product.namespaceId as keyof typeof CATEGORY_NAMES;

  return (
    <div className={styles.breadcrumbs}>
      <button
        className={styles.breadcrumbs__back}
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        <img src="img/icons/icon-left.png" alt="Back" />
        Back
      </button>

      <nav className={styles.breadcrumbs__nav}>
        <Link to="/" className={styles.breadcrumbs__link}>
          Home
        </Link>
        <span className={styles.breadcrumbs__separator}>{'>'}</span>

        <Link to={`/${categoryName}`} className={styles.breadcrumbs__link}>
          {CATEGORY_NAMES[categoryName] || 'Products'}
        </Link>
        <span className={styles.breadcrumbs__separator}>{'>'}</span>

        <span className={styles.breadcrumbs__current}>{product.name}</span>
      </nav>
    </div>
  );
};
