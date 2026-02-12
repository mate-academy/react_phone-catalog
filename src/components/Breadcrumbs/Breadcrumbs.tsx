import { Link, useLocation } from 'react-router-dom';
import { HomeIcon } from '@components/Icons/HomeIcon';
import { ArrowRightIcon } from '@components/Icons/ArrowRightIcon';

import React from 'react';
import styles from './Breadcrumbs.module.scss';

interface BreadcrumbsProps {
  className?: string;
  productName?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  className,
  productName,
}) => {
  const location = useLocation();
  const listOfPaths = location.pathname.split('/').filter(item => item);

  return (
    <nav className={`${styles.breadcrumbs} ${className}`}>
      <Link to="/" className={styles.breadcrumbs__link}>
        <HomeIcon />
      </Link>

      {listOfPaths.map((name, idx) => {
        const routeTo = `/${listOfPaths.slice(0, idx + 1).join('/')}`;
        const isLast = idx === listOfPaths.length - 1;

        return (
          <React.Fragment key={name}>
            <span>
              <ArrowRightIcon active={true} />
            </span>

            {isLast && productName ? (
              <span className={styles.breadcrumbs__text}>{productName}</span>
            ) : isLast ? (
              <span className={styles.breadcrumbs__text}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </span>
            ) : (
              <Link to={routeTo} className={styles.breadcrumbs__link}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
