import React from 'react';
import { Categories } from './components/Categories';
import { Commertials } from './components/Commertials';
import { ProductCards } from '../shared/ProductCards.tsx';
import { Product } from '../../types/Product';

import home from './HomePage.module.scss';

type Props = {
  products: Product[];
};

export const HomePage: React.FC<Props> = ({ products }) => {
  const newestProducts = products.sort(
    (product1, product2) => product2.year - product1.year,
  );
  const hotPrices = products
    .filter(product => product.price !== product.fullPrice)
    .sort(
      (product1, product2) =>
        (product2.fullPrice - product2.price) / product2.fullPrice -
        (product1.fullPrice - product1.price) / product1.fullPrice,
    );

  return (
    <div className={home.home}>
      <div className="container">
        <h1 className={home['home__sr-only']}>Product Catalog</h1>
        <h2 className={home.home__title}>Welcome to Nice Gadgets store!</h2>
      </div>
      <div className={home.home__content}>
        <Commertials />

        <ProductCards title="Brand new models" products={newestProducts} />

        <Categories products={products} />

        <ProductCards title="Hot prices" products={hotPrices} />
      </div>
    </div>
  );
};
