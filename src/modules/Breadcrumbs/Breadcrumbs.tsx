import React from 'react';
import { Link } from 'react-router-dom';
import { IoHomeOutline } from 'react-icons/io5';
import styles from './Breadcrumbs.module.scss';

export type BreadcrumbsProps = {
  category: string;
  productName?: string;
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ category, productName }) => {
  const displayCategory = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb navigation">
      <Link
        to="/"
        className={styles.breadcrumbLink}
        aria-label="Go to homepage"
      >
        <IoHomeOutline className={styles.homeIcon} />
      </Link>

      <span className={styles.separator} aria-hidden="true">
        &gt;
      </span>

      {!productName ? (
        <span className={styles.currentPage}>{displayCategory}</span>
      ) : (
        <Link to={`/${category}`} className={styles.breadcrumbLink}>
          {displayCategory}
        </Link>
      )}

      {productName && (
        <>
          <span className={styles.separator} aria-hidden="true">
            &gt;
          </span>
          <span className={styles.currentPage}>{productName}</span>
        </>
      )}
    </nav>
  );
};

export default Breadcrumbs;
