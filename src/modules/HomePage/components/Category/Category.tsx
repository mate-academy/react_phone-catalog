import React from 'react';
import style from './Category.module.scss';
import { NavLink } from 'react-router-dom';

// eslint-disable-next-line max-len
import phonesImg from '../../../../shared/assets/categoryImage/phoneCategory.png';
// eslint-disable-next-line max-len
import tabletsImg from '../../../../shared/assets/categoryImage/tabletCategory.png';
// eslint-disable-next-line max-len
import accessoriesImg from '../../../../shared/assets/categoryImage/accessoriesCategory.png';

export const Category: React.FC = () => {
  return (
    <div className={style.categorySection}>
      <h1 className={style.categorySectionTitle}>Shop by category</h1>

      <div className={style.category}>
        <div className={style.categoryItem}>
          <NavLink to="/phones">
            <img
              src={phonesImg}
              alt="category phone img"
              className={style.categoryImg}
            />
          </NavLink>

          <h2 className={style.categoryTitle}>Mobile phones</h2>

          <p className={style.categoryDescription}>95 models</p>
        </div>

        <div className={style.categoryItem}>
          <NavLink to="/tablets">
            <img
              src={tabletsImg}
              alt="category phone img"
              className={style.categoryImg}
            />
          </NavLink>

          <h2 className={style.categoryTitle}>Tablets</h2>

          <p className={style.categoryDescription}>24 models</p>
        </div>

        <div className={style.categoryItem}>
          <NavLink to="/accessories">
            <img
              src={accessoriesImg}
              alt="category phone img"
              className={style.categoryImg}
            />
          </NavLink>

          <h2 className={style.categoryTitle}>Accessories</h2>

          <p className={style.categoryDescription}>100 models</p>
        </div>
      </div>
    </div>
  );
};
