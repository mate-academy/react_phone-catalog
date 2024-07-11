import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import { getChevronIconSrc, getHomeIconSrc } from '../../servises/iconSrc';
import { useTheme } from '../../context/ThemeContext';
import classNames from 'classnames';

type BreadcrumbsProps = {
  product?: {
    category: string;
    name: string;
  };
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ product }) => {
  const { theme } = useTheme();
  const { pathname } = useLocation();
  const homeIconSrs = getHomeIconSrc(theme);
  const chevronIconSrc = getChevronIconSrc(theme);

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const getBreadcrumbs = () => {
    if (product) {
      return [
        { path: `/${product.category}`, label: capitalize(product.category) },
        { label: product.name },
      ];
    } else {
      const paths = pathname.split('/').filter(Boolean);

      return paths.map((path, index, array) => ({
        path: `/${array.slice(0, index + 1).join('/')}`,
        label: capitalize(path),
      }));
    }
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <nav className={styles.breadcrumbs}>
      <Link to="/">
        <img src={homeIconSrs} alt="home" className={styles.homeIcon} />
      </Link>
      <span className={styles.chevronSpan}>
        <img
          src={chevronIconSrc}
          alt="chevron"
          className={styles.chevronIcon}
        />
      </span>
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={index}>
          {crumb.path ? (
            <Link
              to={crumb.path}
              className={classNames(styles.label, {
                [styles.active]: pathname !== crumb.path,
              })}
            >
              {crumb.label}
            </Link>
          ) : (
            <span className={styles.label}>{crumb.label}</span>
          )}
          {index < breadcrumbs.length - 1 && (
            <span className={styles.chevronSpan}>
              <img
                src={chevronIconSrc}
                alt="chevron"
                className={styles.chevronIcon}
              />
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
