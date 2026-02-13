import React from 'react';
// import { CardsCariusel } from '../CardsCarousel';
import products from '../../../../../public/api/products.json';
import hotPricesClass from './hotPrices.module.scss';
import { CardsCariusel } from '../../../shared/components/CardsCarousel';

export const HotPrices: React.FC = React.memo(() => {
  const hotPrisesProducts = products
    .filter(product => product.price && product.year >= 2021)
    .sort((a, b) => a.price - b.price);

  return (
    <div className={hotPricesClass['hot-prices']}>
      <CardsCariusel title="Hot Prices" products={hotPrisesProducts} />
    </div>
  );
});

HotPrices.displayName = 'HotPrices';
