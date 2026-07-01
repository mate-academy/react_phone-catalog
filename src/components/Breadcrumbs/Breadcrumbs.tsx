import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Breadcrumbs.module.scss';

interface BreadcrumbsProps {
  category?: string;
  categoryLabel?: string;
  productName?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  category,
  categoryLabel,
  productName,
}) => {
  return (
    <nav
      className={styles.breadcrumbs}
      aria-label="Breadcrumb"
      data-testid="breadcrumbs"
    >
      <Link to="/" className={styles.link} aria-label="Home">
        <i className={`fa-solid fa-house ${styles.homeIcon}`} />
      </Link>

      {category && (
        <>
          <i className={`fa-solid fa-chevron-right ${styles.chevron}`} />
          {productName ? (
            <Link to={`/${category}`} className={styles.link}>
              {categoryLabel || category}
            </Link>
          ) : (
            <span className={styles.current}>{categoryLabel || category}</span>
          )}
        </>
      )}

      {productName && (
        <>
          <i className={`fa-solid fa-chevron-right ${styles.chevron}`} />
          <span className={styles.current}>{productName}</span>
        </>
      )}
    </nav>
  );
};
