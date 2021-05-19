import React from 'react';
import { ProductsList } from '../ProductsList/ProductsList';
import './Main.scss';

export const Main = () => {
  return (
    <main className="Main">
      <div className="Main-Container">
        <ProductsList productType="Mobile phones" />
      </div>
    </main>
  );
};
