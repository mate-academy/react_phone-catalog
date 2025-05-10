import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import styles from './Breadcrumb.module.scss';

export type BreadcrumbType =
  | 'phones'
  | 'tablets'
  | 'accessories'
  | 'favourites'
  | 'cart';

interface BreadcrumbProps {
  type: BreadcrumbType;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ type }) => {
  const { slug } = useParams<string>();

  return (
    <nav className={styles.breadcrumbs}>
      <ul className={styles.breadcrumbs__list}>
        <li className={styles.breadcrumbs__item}>
          <NavLink to="/" className={styles.breadcrumbs__link}>
            Home
          </NavLink>
        </li>
        <li className={styles.breadcrumbs__separator}>›</li>
        <li className={styles.breadcrumbs__item}>
          <NavLink to={`/${type}`} className={styles.breadcrumbs__link}>
            {type}
          </NavLink>
        </li>
        {slug && (
          <>
            <li className={styles.breadcrumbs__separator}>›</li>
            <li
              className={`${styles.breadcrumbs__item} ${styles['breadcrumbs__item--current']}`}
            >
              {slug.replace(/-/g, ' ')}
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
