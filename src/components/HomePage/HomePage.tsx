import React from 'react';
import { ProductCard } from '../ProductCard';
import './HomePage.scss';
import { Banner } from '../Banner';

export const HomePage: React.FC = () => {
  return (
    <>
      <h1 className="title">Welcome to Nice Gadgets store!</h1>

      <Banner />

      <h2 className="title-2">Brand new models</h2>

      <ProductCard />

      <h2 className="title-2">Shop by category</h2>

      <h2 className="title-2">Hot prices</h2>
    </>
  );
};
