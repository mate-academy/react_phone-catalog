import { NavLink } from 'react-router-dom';
import styles from './BreadCrumbs.module.scss';
import React from 'react';
import { ProductCategory } from '../../../../types/ProductCategory';

type Props = {
  category: ProductCategory | 'Favourites';
  itemName?: string;
};

export const BreadCrumbs: React.FC<Props> = ({ category, itemName }) => {
  const categoryName = category[0].toUpperCase() + category.slice(1);

  return (
    <div className={styles.breadcrumbs}>
      <NavLink to="/" className={styles['breadcrumbs-home']}>
        <img src="img/icons/Home.svg" alt="Home page" />
      </NavLink>

      <img
        className={styles['breadcrumbs-arrow']}
        src="img/icons/ChevronArrowRight.svg"
        alt="icon"
      />
      <NavLink to={`/${category}`} className={styles['breadcrumbs-category']}>
        {categoryName}
      </NavLink>
      {itemName && (
        <>
          <img
            className={styles['breadcrumbs-arrow']}
            src="img/icons/ChevronArrowRight.svg"
            alt="icon"
          />
          <p className={styles['breadcrumbs-category']}>{itemName}</p>
        </>
      )}
    </div>
  );
};
