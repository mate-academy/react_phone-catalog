import React from 'react';
import { useOutletContext } from 'react-router-dom';
import styles from './CategoryGrid.module.scss';
import { CategoryCard } from '../CategoryCard';
import { ContextProps } from '../../../../types/ContextProps';

export const CategoryGrid: React.FC = () => {
  const { categories } = useOutletContext<ContextProps>();

  return (
    <section className={styles.categoryGrid}>
      {categories.map(({ id, title, path, img, count }) => (
        <CategoryCard
          key={id}
          title={title}
          img={img}
          path={path}
          count={count}
        />
      ))}
    </section>
  );
};
