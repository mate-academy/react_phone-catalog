import React from 'react';

import '@/styles/main.scss';
import { ProductCarousel } from '../shared/components/ProductCarousel';
import { PromoCarousel } from './PromoCarousel/PromoCarousel';

export const HomePage: React.FC = () => {
  return (
    <main className="container">
      {/* <h1>Welcome to Nice Gadgets store!</h1> */}
      <PromoCarousel></PromoCarousel>
      <ProductCarousel title={'Brand new products'}></ProductCarousel>
    </main>
  );
};
