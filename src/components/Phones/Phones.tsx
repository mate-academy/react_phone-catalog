import React, { useState, useEffect } from 'react';
import { getPhones } from '../../api/api';
import { BreadCrumbs } from '../BreadCrumbs';
import { ProductsList } from '../ProductsList';
import {
  ProductsLoader2x,
} from '../ProductsLoader/ProductsLoader2x';

import './phones.scss';

export const Phones: React.FC = () => {
  const [phonesList, setPhonesList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getPhones(setPhonesList)
      .then(() => setIsLoaded(true));
  }, []);

  const content = () => {
    if (phonesList.length === 0) {
      return (
        <p className="accessories__error">
          Accessories not found
        </p>
      );
    }

    return (
      <ProductsList phonesList={phonesList} />
    );
  };

  return (
    <div className="phones">
      <div className="container">
        <BreadCrumbs title="Phones" />

        <h1 className="phones__title">
          Mobile phones
        </h1>

        {isLoaded
          ? content()
          : <ProductsLoader2x style={{ marginTop: '100px' }} />}
      </div>
    </div>
  );
};
