import React from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../../components/ProductCard';

type Props = {
  products?: Product[];
};

export const Favorites: React.FC<Props> = ({ products = [] }) => {
  return (
    <section className="section">
      <div className="container">
        <div className="section-title-wrapper">
          <h1>Favorites</h1>
          <p className="main-text main-text--secondary"> items</p>
        </div>

        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
