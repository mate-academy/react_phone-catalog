import React from 'react';
import '../../pages/page.scss';
import './HotPrices.scss';

import { ProductsSlider } from '../ProductsSlider/ProductsSlider';
import { Product } from '../../types/Product';

type Props = {
  products: Product[],
};

export const HotPrices: React.FC<Props> = ({ products }) => {
  return (
    <section className="hot-prices page__section">
      <h2 className="hot-prices__title page__section-title">
        Hot prices
      </h2>

      <ProductsSlider products={products} />
    </section>
  );
};
