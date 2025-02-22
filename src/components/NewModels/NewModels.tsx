import React from 'react';
import './NewModels.scss';
import { ProductsSlider } from '../ProductsSlider';
import productsFromServer from '../../../public/api/products.json';
import { getNewPhones } from '../../utils/productHelper';

export const NewModels = () => {
  return (
    <div className="new-models">
      <div className="container container--mobile">
        <h2 className="new-models__title">Brand new models</h2>
        <ProductsSlider
          products={getNewPhones(productsFromServer)}
          fullPrice={false}
        />
      </div>
    </div>
  );
};
