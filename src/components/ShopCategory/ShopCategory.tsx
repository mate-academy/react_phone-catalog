import React from 'react';
import { Link } from 'react-router-dom';
import './ShopCategory.scss';

type Props = {
  count: number
};

export const ShopCategory:React.FC<Props> = ({ count }) => {
  return (
    <div className="shop">
      <h1 className="shop__name">Shop by category</h1>

      <div className="shop__container">
        <div>
          <Link to="/phones" className="shop__link">
            <div className="shop__img shop__img--1">
              <div className="shop__img shop__img--phones" />
            </div>
            <h3 className="shop__title">Mobile phones</h3>
          </Link>
          <p className="shop__count">
            {count}
            {' '}
            models
          </p>
        </div>

        <div>
          <Link to="/tablets" className="shop__link">
            <div className="shop__img shop__img--2">
              <div className="shop__img shop__img--tablets" />
            </div>

            <h3 className="shop__title">Tablets</h3>
          </Link>
          <p className="shop__count">0 model</p>
        </div>

        <div>
          <Link to="/accessories" className="shop__link">
            <div className="shop__img shop__img--3">
              <div className="shop__img shop__img--accessories" />
            </div>

            <h3 className="shop__title">Accessories</h3>
          </Link>
          <p className="shop__count">0 model</p>
        </div>
      </div>
    </div>
  );
};
