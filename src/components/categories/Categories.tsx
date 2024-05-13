import React from 'react';
import styles from './categories.module.scss';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../Hooks/hooks';
import { Theme } from '../../services/theme';

export const Categories: React.FC = () => {
  const theme = useAppSelector(state => state.theme.theme);

  return (
    <>
      <div className={styles.categoriesWrapper}></div>
      <section className={styles.categoriesSections}>
        <h2
          className={
            theme === Theme.light
              ? styles.categoriesTitle
              : styles.categoriesTitleDark
          }
        >
          Shop by category
        </h2>
        <div className={styles.categoriesContainer}>
          <div className={styles.categoriesProductContainer}>
            <NavLink to={'/phones'} className={styles.mobileLink}>
              <div className={styles.mobilePhonePictures}></div>
              <span className={styles.models}>124 models</span>
              <span className={styles.qantity}>Mobile phones</span>
            </NavLink>
          </div>

          <div className={styles.categoriesProductContainer}>
            <NavLink to={'/tablets'} className={styles.mobileLink}>
              <div className={styles.tabletPictures}></div>
              <span className={styles.models}>36 models</span>
              <span className={styles.qantity}>Tablets</span>
            </NavLink>
          </div>

          <div className={styles.categoriesProductContainer}>
            <NavLink to={'/accessories'} className={styles.mobileLink}>
              <div className={styles.accesoriesPictures}></div>
              <span className={styles.models}>34 models</span>
              <span className={styles.qantity}>Accessories</span>
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};
