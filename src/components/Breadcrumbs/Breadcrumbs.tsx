import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import { useIconSrc } from '../../utils/hooks/useIconSrc';
import classNames from 'classnames';

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
      <span className={styles.chevronSpan}>
        <img src={arrowRightUrl} alt="chevron" className={styles.chevronIcon} />
      </span>
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span className={styles.chevronSpan}>
              <img
                src={arrowRightUrl}
                alt="chevron"
                className={styles.chevronIcon}
              />
            </span>
          )}

          {index === breadcrumbs.length - 1 ? (
            <p className={classNames(styles.label, styles.clip)}>
              {crumb.label}
            </p>
          ) : (
            <NavLink
              to={crumb.path || '#'}
              className={({ isActive }) =>
                classNames(styles.label, {
                  [styles.isActive]: isActive,
                })
              }
            >
              {crumb.label}
            </NavLink>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
