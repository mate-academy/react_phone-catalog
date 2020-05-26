import React from 'react';
import { Link } from 'react-router-dom';
import { ProductsAmount } from '../ProductsAmount/ProductsAmount';

export const Category = ({ title, link }: Category) => {
  return (
    <div className="categories__category">
      <Link
        to={`/${link}`}
        className="categories__link"
      >
        <div className="categories__photo">
          <img
            className="categories__image"
            src={`./img/categories/category-${link}.jpg`}
            alt={link}
          />
        </div>
        <h3 className="categories__title">{title}</h3>
        <ProductsAmount />
      </Link>
    </div>
  );
}
