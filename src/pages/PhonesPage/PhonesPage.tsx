import React from 'react';
import { Link } from 'react-router-dom';
import { ProductsList } from '../../components/ProductsList';

import './PhonesPage.scss';

export const PhonesPage: React.FC = () => {
  return (
    <div className="phones-page">
      <div className="phones-page__status status">
        <Link
          to="/"
          className="status__home-logo"
        >
          <img
            src="img/icons/home.svg"
            alt=""
          />
        </Link>

        <img
          src="img/icons/next-arrow-disabled.svg"
          alt=""
          className="status__arrow"
        />

        <p className="status__title">Phones</p>
      </div>

      <ProductsList />
    </div>
  );
};
