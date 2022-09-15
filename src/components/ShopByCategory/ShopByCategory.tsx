import React from 'react';

import './ShopByCategory.scss';

export const ShopByCategory: React.FC = () => {
  return (
    <div className="ShopByCategory">
      <h2 className="ShopByCategory__title">Shop by category</h2>
      <div className="ShopByCategory__content">
        <div className="ShopByCategory__item">
          <img
            src="./img/MobilePhones.jpg"
            alt="phone_category"
            className="ShopByCategory__img"
          />
          <h4
            className="ShopByCategory__name"
          >
            Mobile phones
          </h4>
          <h4
            className="ShopByCategory__count"
          >
            10 models
          </h4>
        </div>
        <div className="ShopByCategory__item">
          <img
            src="./img/Tablets.jpg"
            alt="tablets_category"
            className="ShopByCategory__img"
          />
          <h4
            className="ShopByCategory__name"
          >
            Tablets
          </h4>
          <h4
            className="ShopByCategory__count"
          >
            10 models
          </h4>
        </div>
        <div className="ShopByCategory__item">
          <img
            src="./img/Accessories.jpg"
            alt="accessories_category"
            className="ShopByCategory__img"
          />
          <h4
            className="ShopByCategory__name"
          >
            Accessories
          </h4>
          <h4
            className="ShopByCategory__count"
          >
            10 models
          </h4>
        </div>
      </div>
    </div>
  );
};
