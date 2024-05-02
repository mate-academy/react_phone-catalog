import React from 'react';
import styles from './categories.module.scss';
import { NavLink } from 'react-router-dom';

export const Categories: React.FC = () => {
  return (
    <>
      <section className={styles.categoriesSections}>
        <h2 className={styles.categoriesTitle}>Shop by category</h2>
        <div className={styles.categoriesContainer}>
          <NavLink to={'/phones'} className={styles.mobileLink}>
            <div className={styles.mobilePhonePictures}></div>
          </NavLink>
          <NavLink to={'/tablets'} className={styles.mobileLink}>
            <div className={styles.tabletPictures}></div>
          </NavLink>
          <NavLink to={''} className={styles.mobileLink}>
            <div className={styles.accesoriesPictures}></div>
          </NavLink>
        </div>
        <div className={styles.quantityGoods}>
          <div className={styles.phone}>
            <NavLink to={'/phones'}>
              <span className={styles.qantity}>Mobile phones</span>
            </NavLink>
            <span className={styles.models}>124 models</span>
          </div>
          <div className={styles.tablets}>
            <NavLink to={'/tablets'}>
              <span className={styles.qantity}>Tablets</span>
            </NavLink>
            <span className={styles.models}>36 models</span>
          </div>
          <div className={styles.accessories}>
            <NavLink to={''}>
              <span className={styles.qantity}>Accessories</span>
            </NavLink>
            <span className={styles.models}>34 models</span>
          </div>
        </div>
      </section>
    </>
  );
};
