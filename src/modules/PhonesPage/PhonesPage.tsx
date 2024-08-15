import React from 'react';
import { ProductList } from '../../components/ProductList';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export const PhonesPage: React.FC = () => {
  const category = 'phones';
  const title = 'Mobile Phones';

  return (
    <div>
      <Header />
      <ProductList category={category} title={title} />
      <Footer />
    </div>
  );
};
