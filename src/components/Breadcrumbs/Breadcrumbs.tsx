import React from 'react';

import styles from './Breadcrumbs.module.scss';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '../ui/ArrowRightIcon';
import { HomeIcon } from '../ui/HomeIcon';

interface BreadcrumbsProps {
  category?: string | undefined;
  productName?: string | undefined;
}

const categoryLabels: Record<string, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
  favorites: 'Favourites',
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
          <ArrowRightIcon />
          <Link to={`/${category}`} className={styles.breadcrumbs__link}>
            {categoryLabels[category] || category}
          </Link>
        </>
      )}

      {productName && (
        <>
          <ArrowRightIcon />
          <span className={styles.breadcrumbs__current}>{productName}</span>
        </>
      )}
    </div>
  );
};
