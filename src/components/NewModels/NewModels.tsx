import React from 'react';
import './NewModels.scss';
import { ProductsSlider } from '../ProductsSlider';
import productsFromServer from '../../../public/api/products.json';
import { Product } from '../types/Product';

function newPhones(productsFromServer: Product[], year = 2022) {
  return productsFromServer.reduce((acc, product) => {
    if (
      product.year === year &&
      !acc.some(({ color }) => color === product.color)
    ) {
      acc.unshift(product);
    }
    return acc;
  }, [] as Product[]);
}

export const NewModels = () => {
  return (
    <div className="new-models">
      <div className="container container--mobile">
        <h2 className="new-models__title">Brand new models</h2>
        <ProductsSlider newModels={newPhones(productsFromServer)} />
      </div>
    </div>
  );
};
