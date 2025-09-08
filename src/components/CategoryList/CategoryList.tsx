import React from 'react';
import './CategoryList.scss';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';

type Props = {
  products: Product[];
  errorMessage: string;
};

export const CategoryList: React.FC<Props> = ({ products, errorMessage }) => {
  type Categories = 'tablets' | 'accessories' | 'phones';

  const countProductsByCategory = (category: Categories) => {
    return products.filter(product => product.category === category).length;
  };

  return (
    <div className="home__category-list category-list">
      <h3 className="category-list__title">Shop by category</h3>
      <div className="category-list__categories">
        <div className="categories__card">
          <Link
            to="/phones"
            className="categories__link categories__link--phones"
          />
          <div className="categories__title">
            <p className="categories__title--category">Mobile phones</p>

            <p className="categories__title--models">
              {errorMessage
                ? '0'
                : `${countProductsByCategory('phones')} models`}
            </p>
          </div>
        </div>

        <div className="categories__card">
          <Link
            to="/tablets"
            className="categories__link categories__link--tablets"
          />
          <div className="categories__title">
            <p className="categories__title--category">Tablets</p>

            <p className="categories__title--models">
              {errorMessage
                ? '0'
                : `${countProductsByCategory('tablets')} models`}
            </p>
          </div>
        </div>

        <div className="categories__card">
          <Link
            to="/accessories"
            className="categories__link categories__link--accessories"
          />
          <div className="categories__title">
            <p className="categories__title--category">Accessories</p>

            <p className="categories__title--models">
              {errorMessage
                ? '0'
                : `${countProductsByCategory('accessories')} models`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
