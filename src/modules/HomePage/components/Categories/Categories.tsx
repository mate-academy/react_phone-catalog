import React, { useContext } from 'react';

import { MainContext } from '../../../../context/MainContext';
import { ProductsContext } from '../../../../context/ProductsContext';
import { MainNavLinks } from '../../../../enums/MainNavLinks';
import styles from './Categories.module.scss';
import { Category } from './components/Category';
import {
  ACCESSORIES_COLOR,
  PHONES_COLOR,
  TABLETS_COLOR,
} from './constants/ImgBcColors';
import { CategoriesEnum } from './enums/CategoriesEnum';
import img3 from '/img/category-accessories.png';
import img1 from '/img/category-phones.webp';
import img2 from '/img/category-tablets.png';
import SCSSVariables from '/src/utils/Variables.module.scss';

export const Categories: React.FC = () => {
  const { isFooterAbsPos } = useContext(MainContext);
  const { phones, tablets, accessories } = useContext(ProductsContext);

  // #region variables

  const imgs = [img1, img2, img3];
  const bcColors = [PHONES_COLOR, TABLETS_COLOR, ACCESSORIES_COLOR];
  const categoriesLhs = [phones.length, tablets.length, accessories.length];
  const links = Object.values(MainNavLinks).slice(1);
  const cStyles: React.CSSProperties = isFooterAbsPos
    ? { marginTop: SCSSVariables.categoriesMt }
    : {};

  // #endregion

  return (
    <section className={styles.categories} style={cStyles}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.container}>
        {Object.values(CategoriesEnum).map((value, index) => {
          return (
            <Category
              key={`${value}-${index}`}
              value={value}
              index={index}
              imgs={imgs}
              bcColors={bcColors}
              categoriesLhs={categoriesLhs}
              link={links[index]}
            />
          );
        })}
      </div>
    </section>
  );
};
