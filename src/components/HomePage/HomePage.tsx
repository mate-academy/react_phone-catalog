import React from 'react';
import { Header } from '../Header';
import { ProductCard } from '../ProductCard';

export const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <h1>Welcome to Nice Gadgets store!</h1>

      <ProductCard />
    </>
  );
};
