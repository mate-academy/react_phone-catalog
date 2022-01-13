import React from 'react';
import { NavLink } from 'react-router-dom';
import { Product } from '../../types/Product';

import './Category.scss';

type Props = {
  products: Product[],
};

export const Category: React.FC<Props> = ({ products }) => {
  const countPhones = products.filter(product => product.type === 'phone').length;
  const countTablets = products.filter(product => product.type === 'tablet').length;
  const countAccessories = products.filter(product => product.type === 'accessories').length;

  return (
    <div className="category container">
      <h2 className="category__title">Shop by category</h2>
      <div className="category__content">
        <div className="category__item">
          <NavLink
            to="phones"
            className="category__item-link"
            onClick={() => {
              window.scrollTo({ top: 0 });
            }}
          >
            <i className="far fa-plus-square" />
          </NavLink>
          <img src="./img/category/Phones.png" alt="phones" className="category__item-image" />
          <h2 className="category__item-title">Mobile phones</h2>
          <p className="category__item-count">{`${countPhones} models`}</p>
        </div>
        <div className="category__item">
          <NavLink
            to="tablets"
            className="category__item-link"
            onClick={() => {
              window.scrollTo({ top: 0 });
            }}
          >
            <i className="far fa-plus-square" />
          </NavLink>
          <img src="./img/category/Tablets.png" alt="phones" className="category__item-image" />
          <h2 className="category__item-title">Tablets</h2>
          <p className="category__item-count">{`${countTablets} models`}</p>
        </div>
        <div className="category__item">
          <NavLink
            to="accessories"
            className="category__item-link"
            onClick={() => {
              window.scrollTo({ top: 0 });
            }}
          >
            <i className="far fa-plus-square" />
          </NavLink>
          <img src="./img/category/Accessories.png" alt="phones" className="category__item-image" />
          <h2 className="category__item-title">Accessories</h2>
          <p className="category__item-count">{`${countAccessories} models`}</p>
        </div>
      </div>
    </div>
  );
};
