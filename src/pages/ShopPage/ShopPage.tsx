import React from 'react';
import { Link } from 'react-router-dom';
import phones from '../../api/phones.json';
import accessories from '../../api/accessories.json';
import tablets from '../../api/tablets.json';
import './ShopPage.scss';

export const ShopPage: React.FC = () => {
  return (
    <div className="shop">
      <h2 className="title">Shop by category</h2>
      <div className="shop__container">
        <div className="shop__category">
          <Link to="/phones">
            <div className="shop__img--wrapper">
              <img
                className="shop__img"
                src={`${process.env.PUBLIC_URL}/img/category/categories_phones.png`}
                alt="Mobile"
              />
            </div>
          </Link>
          <p className="shop__title">Mobile phones</p>
          <div className="shop__subtitle">{phones.length} models</div>
        </div>
        <div className="shop__category">
          <Link to="/tablets">
            <div className="shop__img--wrapper">
              <img
                className="shop__img"
                src={`${process.env.PUBLIC_URL}/img/category/categories_tablets.png`}
                alt="Tablets"
              />
            </div>
          </Link>
          <p className="shop__title">Tablets</p>
          <div className="shop__subtitle">{tablets.length} models</div>
        </div>
        <div className="shop__category">
          <Link to="/accessories">
            <div className="shop__img--wrapper">
              <img
                className="shop__img"
                src={`${process.env.PUBLIC_URL}/img/category/categories_accessories.png`}
                alt="Accessories"
              />
            </div>
          </Link>
          <p className="shop__title">Accessories</p>
          <div className="shop__subtitle">{accessories.length} models</div>
        </div>
      </div>
    </div>
  );
};
