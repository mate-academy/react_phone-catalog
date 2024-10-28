import React from 'react';
import styles from './Breadcrumbs.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { PagesPath } from '../../../types/PagesPath';
import { Arrow } from '../Icons/Arrow/Arrow';

type Props = {};

export const Breadcrumbs: React.FC<Props> = () => {
  const { pathname } = useLocation();

  const productsPath = pathname.split('/')[1];
  const productPath = pathname.split('/')[2] || null;

  return (
    <div className={styles.Breadcrumbs}>
      <Link to={PagesPath.Home} className={styles.Breadcrumbs__home} />

      {productPath ? (
        <>
          <Link to={`/${productsPath}`} className={styles.Breadcrumbs__link}>
            <Arrow orientation="right" colorSecondary={true} />

            <span className={styles.Breadcrumbs__link_text}>
              {productsPath}
            </span>
          </Link>

          <p
            className={`${styles.Breadcrumbs__link} ${styles.Breadcrumbs__link_disabled}`}
          >
            <Arrow orientation="right" colorSecondary={true} />

            {productPath.split('-').join(' ')}
          </p>
        </>
      ) : (
        <p
          className={`${styles.Breadcrumbs__link} ${styles.Breadcrumbs__link_disabled}`}
        >
          <Arrow orientation="right" colorSecondary={true} />

          {productsPath}
        </p>
      )}
    </div>
  );
};
