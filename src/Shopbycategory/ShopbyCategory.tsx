import React from 'react';
import { NavLink } from 'react-router-dom';
import './Shopbycategory.scss';

export const ShopbyCategory: React.FC = () => (
  <div className="shopby-category">
    <h2 className="shopby-category__title">Shop by category</h2>
    <div className="shopby-category__grid">
      <div className="category-card">
        <NavLink
          to="/phones"
          className="category-card__link"
        >
          <img
            src="./img/category-phones.png"
            alt="Mobile Phones"
            className="category-card__image"
          />
        </NavLink>
        <h3 className="category-card__title">Mobile phones</h3>
      </div>

      <div className="category-card">
        <NavLink
          to="/tablets"
          className="category-card__link"
        >
          <img
            src="./img/category-tablets.png"
            alt="Tablets"
            className="category-card__image"
          />
        </NavLink>
        <h3 className="category-card__title">Tablets</h3>
      </div>

      <div className="category-card">
        <NavLink
          to="/accessories"
          className="category-card__link"
        >
          <img
            src="./img/category-accessories.png"
            alt="Accessories"
            className="category-card__image"
          />
        </NavLink>
        <h3 className="category-card__title">Accessories</h3>
      </div>
    </div>
  </div>
);
