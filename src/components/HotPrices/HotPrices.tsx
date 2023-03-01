import React from 'react';
import './HotPrices.scss';

import { ProductsSlider } from '../ProductsSlider';
import { Product } from '../../types/Product';

type Props = {
  products: Product[],
};

export const HotPrices: React.FC<Props> = ({ products }) => {
  return (
    <section className="hot-prices">
      <h2 className="hot-prices__title">
        Hot prices
      </h2>

      <div className="hot-prices__content">
        <ProductsSlider products={products} />
      </div>
    </section>
  );
};
