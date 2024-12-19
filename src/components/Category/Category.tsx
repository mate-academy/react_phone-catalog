import React from 'react';
import './Category.scss';
import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';

/* eslint-disable  @typescript-eslint/no-explicit-any */
function productsCount(products: any) {
  return products.length;
}

const categories = [
  {
    name: 'Mobile phones',
    categoryUrl: './mobile',
    imgUrl: '../../../../img/category-phones.png',
    count: productsCount(phones),
  },
  {
    name: 'Tablets',
    categoryUrl: '/tablets',
    imgUrl: '../../../../img/category-tablets.png',
    count: productsCount(tablets),
  },
  {
    name: 'Accessories',
    categoryUrl: '/accessories',
    imgUrl: '../../../../img/category-accessories.png',
    count: productsCount(accessories),
  },
];

export const Category: React.FC = () => {
  return (
    <div className="container container--with-paddings">
      <h2 className="category__title">Shop by category</h2>
      <div className="category__items">
        {categories.map(category => {
          return (
            <div className="category" key={category.name}>
              <a href={category.categoryUrl}>
                <img
                  src={category.imgUrl}
                  alt={category.name}
                  className="category__img"
                />
              </a>
              <div className="category__description">
                <a href={category.categoryUrl} className="category__name">
                  {category.name}
                </a>
                <p className="category__count">{`${category.count} models`}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
