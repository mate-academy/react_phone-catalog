// src/components/ProductsList/ProductsList.tsx
import React from 'react';
import { Product } from '../../types/Product';
import ProductCard from '../ProductCard/ProductCard';
import './ProductsList.module.scss';

interface ProductsListProps {
  products: Product[];
}

const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  return (
    <div className="productsGrid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
