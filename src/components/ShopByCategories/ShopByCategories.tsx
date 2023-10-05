import { FC } from 'react';

import { CategoriesLink } from '../CategoriesLink/CategoriesLink';
import { Category } from '../../types/Category';

import './ShopByCategories.scss';

export const ShopByCategories: FC = () => {
  const Categories: Category[] = [
    {
      id: 1,
      url: '/phones',
      imgSrc: '_new/img/category-phones.png',
      title: 'Mobile phones',
      count: 15,
    },
    {
      id: 2,
      url: '/tablets',
      imgSrc: '_new/img/category-tablets.png',
      title: 'Tablets',
      count: 15,
    },
    {
      id: 3,
      url: '/accessories',
      imgSrc: '_new/img/category-accessories.png',
      title: 'Accessories',
      count: 15,
    },
  ];

  return (
    <div className="categories categories-container">
      <h2 className="categories__title">Shop by categories</h2>

      <div className="categories__links">
        {Categories.map(category => (
          <CategoriesLink key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};
