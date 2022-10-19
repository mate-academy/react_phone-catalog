import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductsContext } from '../ProductProvider';

export const ShopByCategory: React.FC = () => {
  const { phones, tablets, accessories } = useContext(ProductsContext);

  return (
    <div className="shopByCategory">
      <h2 className="shopByCategory__title">Shop by category</h2>
      <div className="shopByCategory__items">
        <div className="shopByCategory__item">
          <div
            className="
              shopByCategory__item-image
              shopByCategory__item-image--phones"
          >
            <Link to="/phones" className="shopByCategory__item-link" />
          </div>
          <div className="shopByCategory__item-content">
            <Link to="/phones" className="shopByCategory__item-title">
              Mobile phones
            </Link>
            <div className="shopByCategory__item-number">
              {`${phones.length} models`}
            </div>
          </div>
        </div>

        <div className="shopByCategory__item">
          <div
            className="
              shopByCategory__item-image
              shopByCategory__item-image--tablets"
          >
            <Link to="/tablets" className="shopByCategory__item-link" />
          </div>
          <div className="shopByCategory__item-content">
            <Link to="/tablets" className="shopByCategory__item-title">
              Tablets
            </Link>
            <div className="shopByCategory__item-number">
              {`${tablets.length} models`}
            </div>
          </div>
        </div>

        <div className="shopByCategory__item">
          <div
            className="
              shopByCategory__item-image
              shopByCategory__item-image--accessories"
          >
            <Link to="/accessories" className="shopByCategory__item-link" />
          </div>
          <div className="shopByCategory__item-content">
            <Link to="/accessories" className="shopByCategory__item-title">
              Accessories
            </Link>
            <div className="shopByCategory__item-number">
              {`${accessories.length} models`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
