import React from 'react';
import './ProductsList.scss';
import { Product } from '../../../types/Product';
import { ProductCard } from '../ProductCard';

type Props = {
  products: Product[];
  displayType: 'fullPrice' | 'with-discount';
};

export const ProductsList: React.FC<Props> = ({ products, displayType }) => (
  <div className="productsList">
    {products.map(product => (
      <ProductCard
        key={product.id}
        product={product}
        displayType={displayType}
      />
    ))}
  </div>
);
