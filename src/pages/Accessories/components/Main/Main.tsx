import React from 'react';
import { ProductsList } from '../../../Phones/components/ProductsList/ProductsList';
import './Main.scss';

export const Main = () => {
  return (
    <main className="Main">
      <div className="Main-Container">
        <ProductsList productType="Accessories" />
      </div>
    </main>
  );
};
