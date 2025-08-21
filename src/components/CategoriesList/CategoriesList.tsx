import React from 'react';
import { CategorySelectCard } from '../CategorySelectCard';
import styles from './CategoriesList.module.scss';

import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';

export const CategoriesList: React.FC = () => {
  const categories = [
    {
      name: 'Mobile phones',
      data: phones,
      image: '/img/category-phones.webp',
      path: '/phones',
    },
    {
      name: 'Tablets',
      data: tablets,
      image: '/img/category-tablets.webp',
      path: '/tablets',
    },
    {
      name: 'Accessories',
      data: accessories,
      image: '/img/category-accessories.webp',
      path: '/accessories',
    },
  ];

  return (
    <div className={styles.categoriesList}>
      {categories.map((el, index) => (
        <CategorySelectCard
          key={index}
          title={el.name}
          quantity={el.data.length}
          image={el.image}
          path={el.path}
        />
      ))}
    </div>
  );
};
