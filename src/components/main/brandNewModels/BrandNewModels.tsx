import React, { useEffect, useState } from 'react';
// import { products } from './api/products.json';
import { Product } from '../../types/Product';
import styles from './BrandNewModels.module.scss';
import { ProductCard } from '../productCard';

export const BrandNewModels: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('./api/products.json')
      .then(response => response.json())
      .then(setProducts)
      .catch(err => {
        throw new Error(err);
      });
  }, []);

  return (
    <>
      <div className="brand_new_models__title">
        <h1>Brand new models</h1>
        <div className="brand_new_models__button">
          <div className="brand_new_models__button__left"></div>
          <div className="brand_new_models__button__right"></div>
        </div>
      </div>

      <div className={styles['brand_new_models__slider']}>
        {[...products]
          .sort((a, b) => b.fullPrice - a.fullPrice)
          .map((product: Product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
      </div>
    </>
  );
};
