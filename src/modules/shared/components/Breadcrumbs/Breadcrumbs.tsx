import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../../../types';
import { CATEGORY_TITLES } from '../../../../utils/categoryTitles';
import styles from './Breadcrumbs.module.scss';

type Props = {
  category: Category | 'favorites';
  productName?: string;
};

export const Breadcrumbs = ({ category, productName }: Props) => {
  const categoryTitle = CATEGORY_TITLES[category];

  return (
    <nav className={styles.breadcrumbs}>
      <Link to="/" className={styles.home}>
        <img src="icons/home.svg" alt="Home" />
      </Link>

      <img src="icons/arrow-right.svg" alt="" />

      {productName ? (
        <Link to={`/${category}`} className={styles.link}>
          {categoryTitle}
        </Link>
      ) : (
        <span className={styles.current}>{categoryTitle}</span>
      )}

      {productName && (
        <>
          <img src="icons/arrow-right.svg" alt="" />
          <span className={styles.current}>{productName}</span>
        </>
      )}
    </nav>
  );
};
