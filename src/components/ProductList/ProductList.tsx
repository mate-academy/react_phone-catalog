import React from 'react';
import { Product } from '../../Types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductList.scss';

type Props = {
  products: Product[];
};

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div className="productList">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};
