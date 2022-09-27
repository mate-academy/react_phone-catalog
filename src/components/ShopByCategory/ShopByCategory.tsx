import React from 'react';
import { Link } from 'react-router-dom';

import './ShopByCategory.scss';

type Props = {
  countTablet: number,
  countPhones: number,
  countAccessories: number,
};

export const ShopByCategory: React.FC<Props> = (
  { countTablet, countPhones, countAccessories },
) => {
  return (
    <div className="ShopByCategory">
      <h2 className="ShopByCategory__title">Shop by category</h2>
      <div className="ShopByCategory__content">
        <div className="ShopByCategory__item">
          <Link to="/phones">
            <img
              src="./img/MobilePhones.jpg"
              alt="phone_category"
              className="ShopByCategory__img"
            />
          </Link>
          <h4
            className="ShopByCategory__name"
          >
            Mobile phones
          </h4>
          <h4
            className="ShopByCategory__count"
          >
            {countPhones}
            {' '}
            models
          </h4>
        </div>
        <div className="ShopByCategory__item">
          <Link to="/tablets">
            <img
              src="./img/Tablets.jpg"
              alt="tablets_category"
              className="ShopByCategory__img"
            />
          </Link>
          <h4
            className="ShopByCategory__name"
          >
            Tablets
          </h4>
          <h4
            className="ShopByCategory__count"
          >
            {countTablet}
            {' '}
            models
          </h4>
        </div>
        <div className="ShopByCategory__item">
          <Link to="/accessories">
            <img
              src="./img/Accessories.jpg"
              alt="accessories_category"
              className="ShopByCategory__img"
            />
          </Link>
          <h4
            className="ShopByCategory__name"
          >
            Accessories
          </h4>
          <h4
            className="ShopByCategory__count"
          >
            {countAccessories}
            {' '}
            models
          </h4>
        </div>
      </div>
    </div>
  );
};
