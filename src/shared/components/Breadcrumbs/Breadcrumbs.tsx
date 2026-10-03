import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

const homeIcon = 'img/icons/Home.svg';
const arrowRightIcon = 'img/icons/Chevron (Arrow Right).svg';

interface Props {
  productName?: string;
  category?: string;
}

const CATEGORY_TITLES: Record<string, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
  favorites: 'Favorites',
  cart: 'Cart',
};

export const Breadcrumbs: React.FC<Props> = ({ productName, category }) => {
  const location = useLocation();

  const pathSegment = location.pathname
    .split('/')
    .filter(Boolean)[0]
    ?.toLowerCase();
  const rawCategory =
    category ||
    (pathSegment && CATEGORY_TITLES[pathSegment] ? pathSegment : '');
  const normalizedCategory = rawCategory.toLowerCase();
  const categoryTitle =
    CATEGORY_TITLES[normalizedCategory] ||
    (rawCategory
      ? rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1)
      : '');
  const categoryRoute = `/${normalizedCategory}`;

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <Link to="/" className={styles.homeLink}>
        <img src={homeIcon} alt="Home" className={styles.icon} />
      </Link>

      {rawCategory && (
        <>
          <img src={arrowRightIcon} alt=">" className={styles.arrow} />
          {productName ? (
            <Link to={categoryRoute} className={styles.link}>
              {categoryTitle}
            </Link>
          ) : (
            <span className={styles.current}>{categoryTitle}</span>
          )}
        </>
      )}

      {productName && (
        <>
          <img src={arrowRightIcon} alt=">" className={styles.arrow} />
          <span className={styles.current}>{productName}</span>
        </>
      )}
    </nav>
  );
};
