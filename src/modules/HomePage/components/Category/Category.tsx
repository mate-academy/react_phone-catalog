import React from 'react';
import style from './Category.module.scss';
import { NavLink } from 'react-router-dom';

import phonesImg from '../../../../shared/img/CategoryImg/phoneCategory.png';
import tabletsImg from '../../../../shared/img/CategoryImg/tabletCategory.png';
import accessoriesImg from '../../../../shared/img/CategoryImg/accessoriesCategory.png';

import phones from '../../../../../public/api/phones.json';
import tablets from '../../../../../public/api/tablets.json';
import accessories from '../../../../../public/api/accessories.json';

export const Category: React.FC = () => {
  return (
    <div className={style.categorySection}>
      <h1 className={style.categorySectionTitle}>Shop by category</h1>

      <div className={style.category}>
        <div className={style.categoryItem}>
          <NavLink to="/phones">
            <img src={phonesImg} alt="category phone img" className={style.categoryImg} />
          </NavLink>

          <h2 className={style.categoryTitle}>Mobile phones</h2>

          <p className={style.categoryDescription}>{phones.length} models</p>
        </div>

        <div className={style.categoryItem}>
          <NavLink to="/tablets">
            <img src={tabletsImg} alt="category phone img" className={style.categoryImg} />
          </NavLink>

          <h2 className={style.categoryTitle}>Tablets</h2>

          <p className={style.categoryDescription}>{tablets.length} models</p>
        </div>

        <div className={style.categoryItem}>
          <NavLink to="/accessories">
            <img src={accessoriesImg} alt="category phone img" className={style.categoryImg} />
          </NavLink>

          <h2 className={style.categoryTitle}>Accessories</h2>

          <p className={style.categoryDescription}>{accessories.length} models</p>
        </div>
      </div>
    </div>
  );
};
