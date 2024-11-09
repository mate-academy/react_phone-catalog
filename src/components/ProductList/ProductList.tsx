import React, { useContext } from 'react';
import { ProductsContext } from '../../store/ProductsContext';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';
import styles from './ProductList.module.scss';

export const ProductList: React.FC = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div className={styles.phonesContainer}>
      {products.length > 0 ? (
        <div className={styles.phonesWrapper}>
          {products.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              imageWrapperSize="large"
            />
          ))}
        </div>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};
