import React from 'react';
import '../../../container.scss';
import './Category.scss';
import { NavLink } from 'react-router-dom';
import { Product } from '../../../type';

interface Props {
  products: Product[],
}

export const Category: React.FC<Props> = ({ products }) => {
  return (
    <div className="category">
      <h2 className="category__title">Shop by category</h2>
      <div className="category__wrapper">
        <div className="category__content">
          <NavLink
            to="/phones"
            className="category__mobile"
            onClick={() => {
              window.scrollTo({ top: 0 });
            }}
          />
          <NavLink
            to="/phones"
            className="category__name"
            onClick={() => {
              window.scrollTo({ top: 0 });
            }}
          >
            Mobile phones
          </NavLink>
          <p className="category__number">
            {products.filter(product => product.type === 'phone').length}
            {' '}
            models
          </p>
        </div>
        <div className="category__content">
          <NavLink
            to="/tablets"
            className="category__tablets"
            onClick={() => {
              window.scrollTo({ top: 0 });
            }}
          />
          <NavLink
            to="/tablets"
            className="category__name"
            onClick={() => {
              window.scrollTo({ top: 0 });
            }}
          >
            Tablets
          </NavLink>
          <p className="category__number">
            {products.filter(product => product.type === 'tablet').length}
            {' '}
            models
          </p>
        </div>
        <div className="category__content">
          <NavLink
            to="/accessories"
            className="category__accessories"
            onClick={() => {
              window.scrollTo({ top: 0 });
            }}
          />
          <NavLink
            to="/accessories"
            className="category__name"
            onClick={() => {
              window.scrollTo({ top: 0 });
            }}
          >
            Accessories
          </NavLink>
          <p className="category__number">0 models</p>
        </div>
      </div>
    </div>
  );
};
