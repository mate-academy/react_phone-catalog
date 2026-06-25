import React from 'react';

import { Link } from 'react-router-dom';

import styles from './ShopByCategory.module.scss';

interface Props {
  counts: {
    phones: number;

    tablets: number;

    accessories: number;
  };
}

export const CategorySection: React.FC<Props> = ({ counts }) => {
  return (
    <section className={styles.categorySection}>
      <h2 className={styles.sectionTitle}>Shop by category</h2>
      <div className={styles.categoryGrid}>
        {/* Карточка 1: Телефоны */}
        <Link to="/phones" className={styles.categoryCard}>
          <div className={`${styles.categoryImage} ${styles.phonesBg}`}>
            <img src="img/category-phones.png" alt="Phones" />
          </div>
          <h4 className={styles.categoryName}>Mobile phones</h4>
          <p className={styles.categoryCount}>{counts.phones} models</p>
        </Link>

        {/* Карточка 2: Планшеты */}
        <Link to="/tablets" className={styles.categoryCard}>
          <div className={`${styles.categoryImage} ${styles.tabletsBg}`}>
            <img src="img/category-tablets.png" alt="Tablets" />
          </div>
          <h4 className={styles.categoryName}>Tablets</h4>
          <p className={styles.categoryCount}>{counts.tablets} models</p>
        </Link>

        {/* Карточка 3: Аксессуары */}
        <Link to="/accessories" className={styles.categoryCard}>
          <div className={`${styles.categoryImage} ${styles.accessoriesBg}`}>
            <img src="img/category-accessories.png" alt="Accessories" />
          </div>
          <h4 className={styles.categoryName}>Accessories</h4>
          <p className={styles.categoryCount}>{counts.accessories} models</p>
        </Link>
      </div>
    </section>
  );
};
