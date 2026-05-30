import React, { useContext } from 'react';
import styles from './ProductsList.module.scss';
import { Product } from '../../types/Product';
import { ProductsContext } from '../../contexts/ProductsContext';
import { ProductCard } from '../ProductCard';

type ProductsListProps = {
  products: Product[];
  isLoading: boolean;
};

export const ProductsList: React.FC<ProductsListProps> = ({
  products,
  isLoading,
}) => {
  const { state } = useContext(ProductsContext);
  const { isSortDropdownOpen, isItemDropdownOpen } = state;

  const containerStyle: React.CSSProperties = {
    pointerEvents: isSortDropdownOpen || isItemDropdownOpen ? 'none' : 'all',
  };

  return (
    <div
      style={containerStyle}
      className={`${styles['products-list']} ${isLoading ? styles.skeleton : ''}`}
    >
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          isLoading={isLoading}
          hotPrice={true}
        />
      ))}
    </div>
  );
};
