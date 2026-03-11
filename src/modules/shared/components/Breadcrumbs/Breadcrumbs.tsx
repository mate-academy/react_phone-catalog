import React from 'react';
import { Link, useLocation, useOutletContext } from 'react-router-dom';
import { HomeIcon, ArrowUpIcon } from '../Icons';
import styles from './Breadcrumbs.module.scss';
import { ContextProps } from '../../../../types/ContextProps';

export const Breadcrumbs: React.FC = () => {
  const { pathname } = useLocation();
  const { products } = useOutletContext<ContextProps>();

  const pathnames = pathname.split('/').filter(x => x);

  let categoryPath = '';
  let categoryName = '';

  if (pathnames[0] === 'product' && pathnames[1]) {
    const currentProduct = products.find(p => p.itemId === pathnames[1]);

    if (currentProduct) {
      categoryPath = `/${currentProduct.category}`;
      categoryName =
        currentProduct.category.charAt(0).toUpperCase() +
        currentProduct.category.slice(1);
    }
  }

  return (
    <nav className={styles.breadcrumbs} aria-label="breadcrumb">
      <Link to="/" className={styles.homeLink}>
        <span className="icon">
          <HomeIcon />
        </span>
      </Link>

      {categoryPath && (
        <>
          <span className="icon icon--right">
            <ArrowUpIcon />
          </span>
          <Link to={categoryPath} className={styles.link}>
            {categoryName}
          </Link>
        </>
      )}

      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        if (value === 'product') {
          return null;
        }

        const displayName =
          value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');

        return (
          <React.Fragment key={to}>
            <span className="icon icon--right">
              <ArrowUpIcon />
            </span>
            {last ? (
              <span className={styles.current}>{displayName}</span>
            ) : (
              <Link to={to} className={styles.link}>
                {displayName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
