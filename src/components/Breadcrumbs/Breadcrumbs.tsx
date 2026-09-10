import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

interface Props {
  category?: string;
  productName?: string;
}

export const Breadcrumbs: React.FC<Props> = ({ category, productName }) => {
  const location = useLocation();

  // Якщо пропси не передані, за замовчуванням парсимо URL
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <Link to="/" className={styles.breadcrumbs__link}>
        <img
          src="img/icons/Home.svg"
          alt="Home"
          className={styles.breadcrumbs__homeIcon}
        />
      </Link>

      {category ? (
        <>
          <span className={styles.breadcrumbs__arrow}>&gt;</span>
          <Link
            to={`/${category.toLowerCase()}`}
            className={styles.breadcrumbs__link}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Link>
          {productName && (
            <>
              <span className={styles.breadcrumbs__arrow}>&gt;</span>
              <span className={styles.breadcrumbs__current}>{productName}</span>
            </>
          )}
        </>
      ) : (
        pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

          return (
            <React.Fragment key={name}>
              <span className={styles.breadcrumbs__arrow}>&gt;</span>
              {isLast ? (
                <span className={styles.breadcrumbs__current}>
                  {formattedName}
                </span>
              ) : (
                <Link to={routeTo} className={styles.breadcrumbs__link}>
                  {formattedName}
                </Link>
              )}
            </React.Fragment>
          );
        })
      )}
    </nav>
  );
};
