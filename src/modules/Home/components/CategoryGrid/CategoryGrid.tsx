import React from 'react';
import { useOutletContext } from 'react-router-dom';
import styles from './CategoryGrid.module.scss';
import { CategoryCard } from '../CategoryCard';
import { Category } from '../../../../types/Category';

export const CategoryGrid: React.FC = () => {
  const { categories } = useOutletContext<{ categories: Category[] }>();

  return (
    <div className={styles.categoryGrid}>
      {categories.map(({ id, title, path, img, count }) => {
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
