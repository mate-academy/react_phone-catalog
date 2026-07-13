import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

type Props = {
  category?: string;
  productName?: string;
  pageName?: string;
};

export const Breadcrumbs: React.FC<Props> = ({
  category,
  productName,
  pageName,
}) => {
  const formattedCategory = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : '';

  return (
    <nav className={styles.breadcrumbs}>
      <Link to="/" className={styles.breadcrumbs__home_link}>
        <img
          src={`${import.meta.env.BASE_URL}img/icons/home.svg`}
          alt="Home"
          className={styles.breadcrumbs__icon}
        />
      </Link>

      {pageName && (
        <>
          <img
            src={`${import.meta.env.BASE_URL}img/icons/arrow-to-right.svg`}
            alt=">"
            className={styles.breadcrumbs__separator}
          />
          <span className={styles.breadcrumbs__current}>{pageName}</span>
        </>
      )}

      {!pageName && category && (
        <>
          <img
            src={`${import.meta.env.BASE_URL}img/icons/arrow-to-right.svg`}
            alt=">"
            className={styles.breadcrumbs__separator}
          />

          {productName ? (
            <Link to={`/${category}`} className={styles.breadcrumbs__link}>
              {formattedCategory}
            </Link>
          ) : (
            <span className={styles.breadcrumbs__current}>
              {formattedCategory}
            </span>
          )}
        </>
      )}

      {!pageName && productName && (
        <>
          <img
            src={`${import.meta.env.BASE_URL}img/icons/arrow-to-right.svg`}
            alt=">"
            className={styles.breadcrumbs__separator}
          />
          <span className={styles.breadcrumbs__current}>{productName}</span>
        </>
      )}
    </nav>
  );
};
