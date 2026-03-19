import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.scss';
import { ProductsSlider } from '../../components/ProductsSlider';
import { PicturesSlider } from '../../components/PicturesSlider';

export const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Product Catalog</h1>

      <section className={styles.section}>
        <PicturesSlider />
      </section>

      <section className={styles.section}>
        <div className={styles.headerBlock}>
          <h2 className={styles.sectionTitle}>Brand new models</h2>
        </div>
        <ProductsSlider sortBy="age" />
      </section>

      <section className={styles.section}>
        <div className={styles.headerBlock}>
          <h2 className={styles.sectionTitle}>Shop by category</h2>
        </div>

        <div className={styles.categories}>
          <Link to="/phones" className={styles.categoryCard}>
            <div className={styles.imageWrapper}>
              <img
                src="img/category-phones.png"
                alt="Mobile phones"
                className={styles.categoryImagePhone}
              />
            </div>
            <h3 className={styles.categoryTitle}>Mobile phones</h3>
            <p className={styles.categoryCount}>95 models</p>
          </Link>

          <Link to="/tablets" className={styles.categoryCard}>
            <div className={styles.imageWrapper}>
              <img
                src="img/category-tablets.png"
                alt="Tablets"
                className={styles.categoryImageTablets}
              />
            </div>
            <h3 className={styles.categoryTitle}>Tablets</h3>
            <p className={styles.categoryCount}>24 models</p>
          </Link>

          <Link to="/accessories" className={styles.categoryCard}>
            <div className={styles.imageWrapper}>
              <img
                src="img/category-accessories.png"
                alt="Accessories"
                className={styles.categoryImageAccess}
              />
            </div>
            <h3 className={styles.categoryTitle}>Accessories</h3>
            <p className={styles.categoryCount}>100 models</p>
          </Link>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.headerBlock}>
          <h2 className={styles.sectionTitle}>Hot prices</h2>
        </div>
        <ProductsSlider sortBy="price" />
      </section>
    </div>
  );
};
