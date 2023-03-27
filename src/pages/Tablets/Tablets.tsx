import React, { useState, useEffect } from 'react';
import { getTablets } from '../../api/api';
import { ProductsList } from '../../components/ProductsList';
import {
  ProductsLoader2x,
} from '../../components/ProductsLoader/ProductsLoader2x';
import { BreadCrumbs } from '../../components/BreadCrumbs';

import './tablets.scss';

export const Tablets: React.FC = () => {
  const [tabletsList, setTabletsList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getTablets(setTabletsList)
      .then(() => setIsLoaded(true));
  }, []);

  const content = () => {
    if (tabletsList.length === 0) {
      return (
        <p className="accessories__error">
          Tablets not found
        </p>
      );
    }

    return (
      <ProductsList phonesList={tabletsList} />
    );
  };

  return (
    <div className="tablets">
      <div className="container">
        <BreadCrumbs title="Tablets" />

        <h1 className="tablets__title">
          Tablets
        </h1>

        {isLoaded
          ? content()
          : <ProductsLoader2x style={{ marginTop: '100px' }} />}
      </div>
    </div>
  );
};
