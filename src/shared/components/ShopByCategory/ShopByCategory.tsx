import React from 'react';
import { CategoryCard } from '../CategoryCard';
import { Category } from '../../types/Category';
import styles from './ShopByCategory.module.scss';

interface Props {
  categories: Category[];
}

export const ShopByCategory: React.FC<Props> = ({ categories }) => {
  return (
    <section className={styles.shopByCategory}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.grid}>
        {categories.map(category => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};
