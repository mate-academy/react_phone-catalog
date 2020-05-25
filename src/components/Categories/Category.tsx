import React from 'react';
import { Link } from 'react-router-dom';

export const Category = ({ title, link }: Category) => (
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
      <p className="products-quantity categories__quantity">95 models</p>
    </Link>
  </div>
);
