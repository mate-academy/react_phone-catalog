import React, { useState, useEffect } from 'react';
import { getAccessories } from '../../api/api';
import { ProductsList } from '../../components/ProductsList';
import {
  ProductsLoader2x,
} from '../../components/ProductsLoader/ProductsLoader2x';
import { BreadCrumbs } from '../../components/BreadCrumbs';

import './accesorize.scss';

export const Accesorize: React.FC = () => {
  const [accessoriesList, setAccessoriesList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getAccessories(setAccessoriesList)
      .then(() => setIsLoaded(true));
  }, []);

  const content = () => {
    if (accessoriesList.length === 0) {
      return (
        <p className="accessories__error">
          Accessories not found
        </p>
      );
    }

    return (
      <ProductsList phonesList={accessoriesList} />
    );
  };

  return (
    <div className="accessories">
      <div className="container">
        <BreadCrumbs title="Accessories" />

        <h1 className="accessories__title">
          Accessories
        </h1>

        {isLoaded
          ? content()
          : <ProductsLoader2x style={{ 'margin-top': '100px' }} />}
      </div>
    </div>
  );
};
