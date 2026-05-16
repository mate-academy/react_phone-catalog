import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';
import { NavLink } from 'react-router-dom';
import React from 'react';
import './Category.scss';

/* eslint-disable  @typescript-eslint/no-explicit-any */
function productsCount(products: any) {
  return products.length;
}

const categories = [
  {
    name: 'Mobile phones',
    categoryUrl: '/phones',
    imgUrl: './img/category-phones.webp',
    count: productsCount(phones),
    backgroundColor: '#6D6474',
  },
  {
    name: 'Tablets',
    categoryUrl: '/tablets',
    imgUrl: './img/category-tablets.webp',
    count: productsCount(tablets),
    backgroundColor: '#8D8D92',
  },
  {
    name: 'Accessories',
    categoryUrl: '/accessories',
    imgUrl: './img/category-accessories.webp',
    count: productsCount(accessories),
    backgroundColor: '#973D5F',
  },
];

export const Category: React.FC = () => {
  return (
    <div className="category__container">
      <h2 className="category__title">Shop by category</h2>
      <div className="category__items">
        {categories.map(category => {
          return (
            <div className="category__items--item" key={category.name}>
              <NavLink to={category.categoryUrl}>
                <div
                  className="category__items--img-wrapper"
                  style={{ backgroundColor: category.backgroundColor }}
                >
                  <img
                    src={category.imgUrl}
                    alt={category.name}
                    className="category__items--img"
                  />
                </div>
              </NavLink>
              <div className="category__items--description">
                <a
                  href={category.categoryUrl}
                  className="category__items--name"
                >
                  {category.name}
                </a>
                <p className="category__items--count">
                  {category.count} models
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
