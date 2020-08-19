import React from 'react';
import { HashRouter, NavLink } from 'react-router-dom';

const Category = () => {
  return (
    <HashRouter>
      <div className="category">
        <div className="category__list">
          <NavLink to="/phones" className="category__item">
            <div className="category__image-wrapper category__image-phones">
              <img
                src={`${window.location.origin}/img/phones-category.png`}
                alt="Phones"
                className="category__image"
              />
            </div>
            <h3 className="category__subtitle">Mobile phones</h3>
            <p className="category__info">95 models</p>
          </NavLink>
          <NavLink to="/tablets" className="category__item">
            <div className="category__image-wrapper category__image-tablets">
              <img
                src={`${window.location.origin}/img/tablets-category.png`}
                alt="Tablets"
                className="category__image"
              />
            </div>
            <h3 className="category__subtitle">Tablets</h3>
            <p className="category__info">24 models</p>
          </NavLink>
          <NavLink to="/accessories" className="category__item">
            <div className="category__image-wrapper category__image-accessories">
              <img
                src={`${window.location.origin}/img/accessories-category.png`}
                alt="Accessories"
                className="category__image"
              />
            </div>
            <h3 className="category__subtitle">Accessories</h3>
            <p className="category__info">100 models</p>
          </NavLink>
        </div>
      </div>
    </HashRouter>
  );
};

export default Category;
