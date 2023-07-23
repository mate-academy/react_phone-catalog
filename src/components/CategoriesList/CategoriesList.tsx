import React from 'react';
import { Category } from '../../types/Category';
import { CategoryCard } from '../CategoryCard/CategoryCard';
import './categoriesList.scss';

export type Props = {
  productsCounter: {
    [key: string]: number
  },
};

export const CategoriesList: React.FC<Props> = ({ productsCounter }) => {
  const categories = [
    { id: 1, title: 'Mobile phones' },
    { id: 2, title: 'Tablets' },
    { id: 3, title: 'Accessories' },
  ];

  const normalizeNameCategory = (category: string): string => {
    return category === 'Mobile phones' ? 'phones' : category.toLowerCase();
  };

  const categoriesNormalized: Category[] = categories.map(item => {
    const newName = normalizeNameCategory(item.title);

    return ({
      ...item,
      name: newName,
      itemCount: productsCounter[newName],
    });
  });

  return (
    <ul className="product-category">
      {categoriesNormalized.map(category => (
        <CategoryCard
          key={category.name}
          data-cy="categoryLinksContainer"
          category={category}
        />
      ))}
    </ul>
  );
};
