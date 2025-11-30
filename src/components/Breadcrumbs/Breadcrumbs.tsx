import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

type Props = {
  category: string;
  lastItem?: string;
};

export const Breadcrumbs: React.FC<Props> = ({ category, lastItem }) => {
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className={styles.breadcrumbs} data-cy="breadCrumbs">
      <Link to="/" className={styles.homeLink}>
        <img src="img/icons/Home.png" alt="Home" />
      </Link>

      <div className={styles.separator}>
        <img src="img/icons/ArrowRight.png" alt=">" />
      </div>

      <Link to={`/${category}`} className={styles.link}>
        {categoryName}
      </Link>

      {lastItem && (
        <>
          <div className={styles.separator}>
            <img src="img/icons/ArrowRight.png" alt=">" />
          </div>
          <span className={styles.lastItem}>{lastItem}</span>
        </>
      )}
    </div>
  );
};
