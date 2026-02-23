// Breadcrumbs.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '/img/Home.png';
import ChevronIcon from '/img/ChevronRight.png';
import styles from './Breadcrumbs.module.scss';

interface BreadcrumbsProps {
  category?: string;
  productName?: string;
  from: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  category,
  productName,
  from,
}) => {
  const categoryLabel = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : '';

  return (
    <div className={styles.breadcrumbs}>
      <Link to="/" className={styles.breadcrumbs_link}>
        <img src={HomeIcon} alt="Home" />
      </Link>

      {category && (
        <>
          <span className={styles.breadcrumbs_arrow}>
            <img src={ChevronIcon} alt="Chevron" />
          </span>
          <Link to={from} className={styles.breadcrumbs_link}>
            {categoryLabel}
          </Link>
        </>
      )}

      {productName && (
        <>
          <span className={styles.breadcrumbs_arrow}>
            <img src={ChevronIcon} alt="Chevron" />
          </span>
          <span className={styles.breadcrumbs_link}>{productName}</span>
        </>
      )}
    </div>
  );
};
