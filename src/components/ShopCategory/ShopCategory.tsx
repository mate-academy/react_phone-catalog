import React from 'react';
import { Link } from 'react-router-dom';
import phonesData from '../../../public/api/phones.json';
import tabletsData from '../../../public/api/tablets.json';
import accessoriesData from '../../../public/api/accessories.json';

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
                src="img/category/category_phone.png"
                alt=""
              />
              <h4 className="shop_category__card--title">Mobile phones</h4>
            </Link>
            <p className="shop_category__card--description">
              {phonesData.length} models
            </p>
          </div>
          <div className="shop_category__box--card shop_category__card">
            <Link to="/tablets">
              <img
                className="shop_category__card--img"
                src="img/category/category_tablets.png"
                alt=""
              />
              <h4 className="shop_category__card--title">Tablets</h4>
            </Link>
            <p className="shop_category__card--description">
              {tabletsData.length} models
            </p>
          </div>
          <div className="shop_category__box--card shop_category__card">
            <Link to="/accessories">
              <img
                className="shop_category__card--img"
                src="img/category/category_accessories.png"
                alt=""
              />
              <h4 className="shop_category__card--title">Accessories</h4>
            </Link>
            {/* eslint-disable-next-line max-len  */}
            <p className="shop_category__card--description shop_category__card--description-last">
              {accessoriesData.length} models
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
