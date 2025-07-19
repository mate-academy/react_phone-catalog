// import React from 'react';
import { getCategoriesData } from '../../../../helpers/getCategoryData';
import { CategoryCard } from '../../components/CategoryCard/CategoryCard';
import styles from './ShopByCategory.module.scss';

export const ShopByCategory = () => {
  const categories = getCategoriesData();

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <h2 className={styles.title}>Shop by category</h2>

        <div className={styles.grid}>
          {categories.map(category => (
            <CategoryCard
              key={category.category}
              title={category.title}
              category={category.category}
              count={category.count}
              image={category.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
