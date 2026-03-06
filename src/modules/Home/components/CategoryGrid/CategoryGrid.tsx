import React from 'react';
import styles from './CategoryGrid.module.scss';
import { CategoryCard } from '../CategoryCard';
import { CATEGORIES } from '../../../shared/constants/categories';

export const CategoryGrid: React.FC = () => {
  return (
    <div className={styles.categoryGrid}>
      {CATEGORIES.map(({ id, title, path, img, count }) => {
        return (
          <CategoryCard
            key={id}
            title={title}
            img={img}
            count={count}
            path={path}
          />
        );
      })}
    </div>
  );
};
