import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

interface Props {
  category?: string;
  productId?: string;
}

export const Breadcrumbs: React.FC<Props> = ({ category, productId }) => {
  const formatName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const formatProductName = (name: string) => {
    return name
      .split('-')
      .map(word => formatName(word))
      .join(' ');
  };

  return (
    <div className={styles.breadcrumbs}>
      <Link to="/" className={styles.breadcrumbs__link}>
        <div className={styles.breadcrumbs__iconHome} />
      </Link>

      <div className={styles.breadcrumbs__iconArrow} />

      {category && (
        <>
          {productId ? (
            <Link to={`/${category}`} className={styles.breadcrumbs__link}>
              {formatName(category)}
            </Link>
          ) : (
            <span className={styles.breadcrumbs__text}>
              {formatName(category)}
            </span>
          )}
        </>
      )}

      {productId && (
        <>
          <div className={styles.breadcrumbs__iconArrow} />

          <span className={styles.breadcrumbs__text}>
            {formatProductName(productId)}
          </span>
        </>
      )}
    </div>
  );
};
