import React from 'react';
import './HotPrices.scss';
import { ProductsSlider } from '../ProductsSlider';
import productsFromServer from '../../../public/api/products.json';
import { getHotPrices } from '../../utils/productHelper';

export const HotPrices = () => {
  return (
    <div className="hot-prices">
      <div className="container container--mobile">
        <h2 className="hot-prices__title">Hot prices</h2>
        <ProductsSlider
          products={getHotPrices(productsFromServer)}
          fullPrice={true}
        />
      </div>
    </div>
  );
};
