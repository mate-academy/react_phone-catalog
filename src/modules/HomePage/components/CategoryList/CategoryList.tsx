import React from 'react';
import styles from './CategoryList.module.scss';
import { CategoryItem } from '../CategoryItem/CategoryItem';

const categories = [
  {
    title: 'Mobile phones',
    category: 'phones',
    image: 'img/categories/phones.png',
  },
  {
    title: 'Tablets',
    category: 'tablets',
    image: 'img/categories/tablets.png',
  },
  {
    title: 'Accessories',
    category: 'accessories',
    image: 'img/categories/accessories.png',
  },
];

export const CategoryList: React.FC = () => {
  return (
    <div className={styles['category-selector']}>
      <div className={styles['category-selector__container']}>
        <div className={`${styles['category-selector__title']} title`}>
          Shop by category
        </div>

        <div className={styles['category-selector__items']}>
          {categories.map(category => (
            <CategoryItem key={category.image} categoryItem={category} />
          ))}
        </div>
      </div>
    </div>
  );
};
