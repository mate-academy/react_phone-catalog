import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import React from 'react';

interface Props {
  title: string;
  categoryTitle?: string;
  categoryPath?: string;
}

export const Breadcrumbs: React.FC<Props> = ({
  title,
  categoryTitle,
  categoryPath,
}) => {
  return (
    <div className={styles.breadcrumbs}>
      <Link to="/" className={styles.breadcrumbs__link}>
        <img
          src="images/icons/home.png"
          alt="Home"
          className={styles.breadcrumbs__home}
        />
      </Link>

      {categoryTitle && categoryPath && (
        <>
          <img
            src="images/icons/arrow-breadcrumbs.png"
            alt=""
            className={styles.breadcrumbs__arrow}
          />

          <Link to={categoryPath} className={styles.breadcrumbs__link}>
            <span className={styles.breadcrumbs__category}>
              {categoryTitle}
            </span>
          </Link>
        </>
      )}

      <img
        src="images/icons/arrow-breadcrumbs.png"
        alt=""
        className={styles.breadcrumbs__arrow}
      />

      <span className={styles.breadcrumbs__current}>{title}</span>
    </div>
  );
};
