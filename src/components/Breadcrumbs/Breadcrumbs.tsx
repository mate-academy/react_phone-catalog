import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import { useIconSrc } from '../../utils/hooks/useIconSrc';

type BreadcrumbsProps = {
  product?: {
    category: string;
    name: string;
  };
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ product }) => {
  const { arrowRightUrl, homeUrl } = useIconSrc();
  const { pathname } = useLocation();

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const getBreadcrumbs = () => {
    if (product) {
      return [
        { path: `/${product.category}`, label: capitalize(product.category) },
        { label: product.name },
      ];
    }

    return pathname
      .split('/')
      .filter(Boolean)
      .map((path, index, array) => ({
        path: `/${array.slice(0, index + 1).join('/')}`,
        label: capitalize(path),
      }));
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <nav className={styles.breadcrumbs}>
      <Link to="/">
        <img src={homeUrl} alt="home" className={styles.homeIcon} />
      </Link>

      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={index}>
          <span className={styles.chevronSpan}>
            <img
              src={arrowRightUrl}
              alt="chevron"
              className={styles.chevronIcon}
            />
          </span>
          {crumb.path ? (
            <Link to={crumb.path} className={styles.label}>
              {crumb.label}
            </Link>
          ) : (
            <span className={styles.label}>{crumb.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
