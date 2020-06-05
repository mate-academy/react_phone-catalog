
import React from 'react';
import { Product } from '../../../interfaces';
import { ProductCard } from '../../ProductCard/ProductCard';
import './CardsContainer.scss';


export const CardsContainer = ({ products }: { products: Product[] }) => {
  return (
    <div className="CardsContainer">
      {products.map((product: Product, index) => {
        return (
          <ProductCard
            key={product.id + index}
            product={product}
          />
        );
      })}
    </div>);
}

