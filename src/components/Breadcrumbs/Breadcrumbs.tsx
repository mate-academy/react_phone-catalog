import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '../ui/ArrowRightIcon';
import { HomeIcon } from '../ui/HomeIcon';
import styles from './Breadcrumbs.module.scss';

interface BreadcrumbsProps {
  category?: string | undefined;
  productName?: string | undefined;
}

const categoryLabels: Record<string, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
  favourites: 'Favourites',
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  category,
  productName,
}) => {
  return (
    <div className={styles.breadcrumbs}>
      <Link to="/" className={styles.breadcrumbs__home}>
        <HomeIcon />
      </Link>

      {category && (
        <>
          <span className={styles.breadcrumbs__separator}>
            <ArrowRightIcon />
          </span>
          <Link to={`/${category}`} className={styles.breadcrumbs__link}>
            {categoryLabels[category] || category}
          </Link>
        </>
      )}

      {productName && (
        <>
          <span className={styles.breadcrumbs__separator}>
            <ArrowRightIcon />
          </span>
          <span className={styles.breadcrumbs__current}>{productName}</span>
        </>
      )}
    </div>
  );
};
