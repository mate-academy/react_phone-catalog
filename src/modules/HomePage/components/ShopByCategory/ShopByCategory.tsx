import React from 'react';
import { CategoryItem } from './components/CategoryItem';

import styles from './ShopByCategory.module.scss';

export const ShopByCategory = () => {
  const categories = [
    {
      id: 1,
      categoryName: 'Mobile phones',
      countOfModels: 95, //for ui
      link: 'phones',
      image: 'img/category-phones.png',
      bgColor: '#6D6474',
    },
    {
      id: 2,
      categoryName: 'Tablets',
      countOfModels: 24, //for ui
      link: 'tablets',
      image: 'img/category-tablets.png',
      bgColor: '#8D8D92',
    },
    {
      id: 3,
      categoryName: 'Accessories',
      countOfModels: 100, //for ui
      link: 'accessories',
      image: 'img/category-accessories.png',
      bgColor: '#973D5F',
    },
  ];

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.grid}>
        {categories.map(category => (
          <CategoryItem
            key={category.id}
            categoryName={category.categoryName}
            countOfModels={category.countOfModels}
            link={category.link}
            image={category.image}
            bgColor={category.bgColor}
          />
        ))}
      </div>
    </section>
  );
};
