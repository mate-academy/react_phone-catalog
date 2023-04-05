import React, { useState, useEffect } from 'react';
import { getPhones } from '../../api/api';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { ProductsList } from '../../components/ProductsList';
import {
  ProductsLoader2x,
} from '../../components/ProductsLoader/ProductsLoader2x';

import './phones.scss';
import { ProductItem } from '../../types/ProductItem';

export const Phones: React.FC = () => {
  const [phonesList, setPhonesList] = useState<ProductItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getPhones()
      .then(data => {
        setPhonesList(data);
        setIsLoaded(true);
      });

  }, []);

  const getContent = () => {
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
          ? getContent()
          : <ProductsLoader2x style={{ marginTop: '100px' }} />}
      </div>
    </div>
  );
};
