import React from 'react';
import styles from './Category.module.scss';
import { CategoryItem } from './components/CategoryItem';
import { categoryItems } from '../../../../utils/categoryItems';

export const Category = () => {
  return (
    <section>
      <h2 className={styles.title}>Shop by category</h2>
      <div className={styles.wrapper}>
        {categoryItems.map(item => (
          <CategoryItem
            key={item.label}
            imgSrc={item.imgSrc}
            label={item.label}
            category={item.category}
            alt={item.alt}
            to={item.to}
          />
        ))}
      </div>
    </section>
  );
};
