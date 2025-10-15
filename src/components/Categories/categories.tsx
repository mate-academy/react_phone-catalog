import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './categories.scss';

export const Category = () => {
  return (
    <div className="categories">
      <div className="categories__top">
        <h4 className="categories__top__title">Shop by category</h4>
      </div>
      <div className="categories__list">
        <div className="categories__list__category">
          <NavLink className="categories__list__category--link" to="/phones">
            <img
              className="categories__list__category--image
              categories__list__category--phones
              "
              src="./img/category-phones.webp"
            />
          </NavLink>
          <p className="categories__list__category__name">Mobile phones</p>
          <p className="categories__list__category__quantity">95 models</p>
        </div>
        <div className="categories__list__category">
          <NavLink className="categories__list__category--link" to="/tablets">
            <img
              className="categories__list__category--image
              categories__list__category--tablets
              "
              src="./img/category-tablets.png"
            />
          </NavLink>
          <p className="categories__list__category__name">Tablets</p>
          <p className="categories__list__category__quantity">24 models</p>
        </div>
        <div className="categories__list__category">
          <NavLink
            className="categories__list__category--link"
            to="/accessories"
          >
            <img
              className="categories__list__category--image
              categories__list__category--accessories
              "
              src="./img/category-accessories.png"
            />
          </NavLink>
          <p className="categories__list__category__name">Accessories</p>
          <p className="categories__list__category__quantity">100 models</p>
        </div>
      </div>
    </div>
  );
};
