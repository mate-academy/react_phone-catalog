import React from 'react';
import { ProductCard } from '../ProductCard';
import './HomePage.scss';

export const HomePage: React.FC = () => {
  return (
    <>
      <h1 className="title">Welcome to Nice Gadgets store!</h1>

      <ProductCard />
    </>
  );
};
