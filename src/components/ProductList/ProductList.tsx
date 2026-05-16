import React from 'react';
import styles from './ProductList.module.scss';
import '../../styles/App.scss';
import ProductCard from '../ProductCard';
import { Product } from '../../types/products';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className={styles.products}>
      {products.map((product, index) => (
        <ProductCard key={index} size="auto" product={product} />
      ))}
    </div>
  );
};

export default ProductList;
