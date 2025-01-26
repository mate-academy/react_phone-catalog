import { useContext } from 'react';

import styles from './Categories.module.scss';

import { Category } from '@HomePage/types/Category';

import { CategoryComponent } from '@HomePage/components/CategoryComponent';

import { ProductsContext } from '@store/ProductsStore';

export const Categories = () => {
  const products = useContext(ProductsContext);

  const categories: Category[] = [
    {
      bgColor: '#6D6474',
      title: 'Mobile phones',
      img: './img/category-phones.webp',
      amount: products.phones.length,
    },
    {
      bgColor: '#8D8D92',
      title: 'Tablets',
      img: './img/category-tablets.png',
      amount: products.tablets.length,
    },
    {
      bgColor: '#D53C51',
      title: 'Accessories',
      img: './img/category-accessories.png',
      amount: products.accessories.length,
    },
  ];

  return (
    <section className={styles.categories}>
      <div className={styles.categories__header}>
        <h2>Shop by category</h2>
      </div>

      <div className={styles.categories__categories}>
        {categories.map(category => (
          <div key={category.title} className={styles.categories__category}>
            <CategoryComponent category={category} />
          </div>
        ))}
      </div>
    </section>
  );
};
