import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import './ShopByCategory.scss';

import categoryPhones from '../../images/categories/phones.png';
import categoryTablets from '../../images/categories/tablets.png';
import categoryAccessories from '../../images/categories/accessories.png';

export const ShopByCategory: React.FC = () => {
  const {
    phonesCount,
    tabletsCount,
    accessoriesCount,
  } = useContext(AppContext);

  return (
    <div className="ShopByCategory">
      <div className="container">
        <div className="ShopByCategory__content">
          <h2 className="ShopByCategory__title">
            Shop by category
          </h2>
          <div
            className="ShopByCategory__categories"
            data-cy="categoryLinksContainer"
          >
            <div className="ShopByCategory__category">
              <Link
                to="/phones"
                className="ShopByCategory__category-content"
              >
                <img
                  src={categoryPhones}
                  alt="Mobile Phones"
                  className="ShopByCategory__category-image"
                />

                <div className="ShopByCategory__category-info">
                  <h3 className="ShopByCategory__category-title">
                    Mobile phones
                  </h3>
                  <div className="ShopByCategory__category-count">
                    {phonesCount}
                  </div>
                </div>
              </Link>
            </div>
            <div className="ShopByCategory__category">
              <Link
                to="/tablets"
                className="ShopByCategory__category-content"
              >
                <img
                  src={categoryTablets}
                  alt="Tablets"
                  className="ShopByCategory__category-image"
                />
                <div className="ShopByCategory__category-info">
                  <h3 className="ShopByCategory__category-title">
                    Tablets
                  </h3>
                  <div className="ShopByCategory__category-count">
                    {tabletsCount}
                  </div>
                </div>
              </Link>
            </div>
            <div className="ShopByCategory__category">
              <Link
                to="/accessories"
                className="ShopByCategory__category-content"
              >
                <img
                  src={categoryAccessories}
                  alt="Accessories"
                  className="ShopByCategory__category-image"
                />
                <div className="ShopByCategory__category-info">
                  <h3 className="ShopByCategory__category-title">
                    Accessories
                  </h3>
                  <div className="ShopByCategory__category-count">
                    {accessoriesCount}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
