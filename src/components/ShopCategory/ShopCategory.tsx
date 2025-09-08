/* eslint-disable max-len */

import phones from '../../api/phones.json';
import tablets from '../../api/tablets.json';
import accessories from '../../api/accessories.json';
import React from 'react';

export const ShopCategory: React.FC = () => {
  return (
    <div className="container">
      <div className="shop_category">
        <h2 className="shop_category__title">Shop by category</h2>
        <div className="shop_category__box">
          <div className="shop_category__box--card phones-bg">
            <a href="/phones" className="shop_category__card--img-link">
              <img
                src="/img/category-phones.webp"
                alt="Mobile phones"
                className="shop_category__card--img"
              />
            </a>
            <div className="shop_category__card--info">
              <a href="/phones" className="shop_category__card--title-link">
                <h4 className="shop_category__card--title">Mobile phones</h4>
              </a>
              <p className="shop_category__card--description">
                {phones.length} models
              </p>
            </div>
          </div>

          <div className="shop_category__box--card tablets-bg">
            <a href="/tablets" className="shop_category__card--img-link">
              <img
                src="/img/category-tablets.webp"
                alt="Tablets"
                className="shop_category__card--img"
              />
            </a>
            <div className="shop_category__card--info">
              <a href="/tablets" className="shop_category__card--title-link">
                <h4 className="shop_category__card--title">Tablets</h4>
              </a>
              <p className="shop_category__card--description">
                {tablets.length} models
              </p>
            </div>
          </div>

          <div className="shop_category__box--card accessories-bg">
            <a href="/accessories" className="shop_category__card--img-link">
              <img
                src="/img/category-accessories.webp"
                alt="Accessories"
                className="shop_category__card--img"
              />
            </a>
            <div className="shop_category__card--info">
              <a
                href="/accessories"
                className="shop_category__card--title-link"
              >
                <h4 className="shop_category__card--title">Accessories</h4>
              </a>
              <p className="shop_category__card--description">
                {accessories.length} models
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
