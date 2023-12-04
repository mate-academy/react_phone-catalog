import React from 'react';
import './ShopByCategory.scss';
import { CategoryCard } from '../CategoryCard';
import { getUniqueId } from '../../helpers/getFunctions/getUniqueld';

export const ShopByCategory: React.FC = () => {
  const categorys = [
    {
      name: 'Mobile phones',
      backgroundColor: '#fcdbc1',
      link: '/phones',
      imageUrl: '/new/img/category-phones.png',
    },
    {
      name: 'Tablets',
      backgroundColor: '#8d8d92',
      link: '/tablets',
      imageUrl: '/new/img/category-tablets.png',
    },
    {
      name: 'Accessories',
      backgroundColor: '#973d5f',
      link: '/accessories',
      imageUrl: '/new/img/category-accessories.png',
    },
  ];

  return (
    <section className="main__shop-by-category shop-by-category">
      <div className="container">
        <div className="shop-by-category__content">
          <h2 className="shop-by-category__title">
            Shop by category
          </h2>

          <ul className="shop-by-category__list">
            {
              categorys.map(category => (
                <li
                  key={getUniqueId()}
                  className="shop-by-category__item"
                >
                  <CategoryCard category={category} />
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </section>
  );
};
