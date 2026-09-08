/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';
import React from 'react';

export const ShopCategory: React.FC = () => {
  return (
    <div className="container">
      <div className="shop_category">
        <h2 className="shop_category__title">Shop by category</h2>
        <div className="shop_category__box">
          <div className="shop_category__box--card shop_category__card">
            <Link to="/phones">
              <img
                className="shop_category__card--img"
                src="./img/category_phone.png"
                alt=""
              />
              <h4 className="shop_category__card--title">Mobile phones</h4>
            </Link>
            <p className="shop_category__card--description">
              {phones.length} models
            </p>
          </div>

          <div className="shop_category__box--card shop_category__card">
            <Link to="/tablets">
              <img
                className="shop_category__card--img"
                src="./img/category_tablet.png"
                alt=""
              />
              <h4 className="shop_category__card--title">Tablets</h4>
            </Link>
            <p className="shop_category__card--description">
              {tablets.length} models
            </p>
          </div>

          <div className="shop_category__box--card shop_category__card">
            <Link to="/accessories">
              <img
                className="shop_category__card--img"
                src="./img/category_accessories.png"
                alt=""
              />
              <h4 className="shop_category__card--title">Accessories</h4>
            </Link>
            <p className="shop_category__card--description shop_category__card--description-last">
              {accessories.length} models
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
