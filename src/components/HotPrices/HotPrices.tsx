import React from 'react';
import './HotPrices.scss';
import { ProductsSlider } from '../ProductsSlider';
import productsFromServer from '../../../public/api/products.json';
import { Product } from '../types/Product';

function hotPrices(products: Product[]) {
  return products.reduce((acc, product) => {
    if (
      product.category === 'phones' &&
      product.price < product.fullPrice &&
      !acc.some(({ color }) => color === product.color)
    ) {
      acc.push(product);
    }

    return acc;
  }, [] as Product[]);
}

export const HotPrices = () => {
  return (
    <div className="hot-prices">
      <div className="container container--mobile">
        <h2 className="hot-prices__title">Hot prices</h2>
        <ProductsSlider
          newModels={hotPrices(productsFromServer)}
          fullPrice={true}
        />
      </div>
    </div>
  );
};
