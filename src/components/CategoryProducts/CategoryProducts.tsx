import React from 'react';

import { CategoryCard } from './CategoryCard';

import { Product } from '../../types/Product';
import { Category } from './CategoryCard/Category';

import categories from './categories.json';

import styles from './CategoryProducts.module.scss';

const items = categories as Category[];

type Props = {
  title: string;
  products: Product[];
  isLoading?: boolean;
};

export const CategoryProducts: React.FC<Props> = ({
  title,
  products,
  isLoading,
}) => {
  const getCount = (category: Product['category']) =>
    products.filter(product => product.category === category).length;

  return (
    <section className={styles['category-products']}>
      <h2 className={styles['category-products__title']}>{title}</h2>

      <div className={styles['category-products__grid']}>
        {items.map(category => (
          <CategoryCard
            key={category.path}
            category={category}
            count={getCount(category.category)}
            isLoading={isLoading}
          />
        ))}
      </div>
    </section>
  );
};
