import React from 'react';
import { Link } from 'react-router-dom';

import PhonesImg from '../../images/phones-cat.jpg';
import TabletsImg from '../../images/tablets-cat.jpg';
import AccessoriesImg from '../../images/accessories-cat.jpg';

import './shopCategory.scss';

export const ShopCategory: React.FC = () => {
  return (
    <div className="shopCategory">
      <div className="container">
        <h2 className="shopCategory__title">
          Shop by category
        </h2>
        <div className="shopCategory__block">
          <Link
            to="/phones"
            className="shopCategory__item"
          >
            <img src={PhonesImg} alt="" />
            <h3 className="shopCategory__name">
              Mobile phones
            </h3>
            <p className="shopCategory__count">
              {`${95} models`}
            </p>
          </Link>

          <Link
            to="/tablets"
            className="shopCategory__item"
          >
            <img src={TabletsImg} alt="" />
            <h3 className="shopCategory__name">
              Tablets
            </h3>
            <p className="shopCategory__count">
              {`${95} models`}
            </p>
          </Link>

          <Link
            to="/accessories"
            className="shopCategory__item"
          >
            <img src={AccessoriesImg} alt="" />
            <h3 className="shopCategory__name">
              Accessories
            </h3>
            <p className="shopCategory__count">
              {`${95} models`}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};
