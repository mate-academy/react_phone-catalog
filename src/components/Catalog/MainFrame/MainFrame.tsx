
import React from 'react';
import { Product } from '../../../interfaces';
import { ProductCard } from '../../ProductCard/ProductCard';
import './MainFrame.scss';


export const MainFrame = ({ products }: { products: Product[] }) => {
  return (
    <div className="MainFrame">
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

