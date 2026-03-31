import React, { useEffect, useState } from 'react';
import { ProductCard } from '../../../components/ProductList/ProductCard';
import styles from './PhonesPage.module.scss';
import { getProducts } from '../../../components/api/products';
import { Product } from '../../../components/types/Product';

export const PhonesPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data: Product[]) => {
        const phones = data.filter(item => item.category === 'phones');
        setProducts(phones);
      })
      .catch(error => {
        console.error('Error loading phones:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className={styles.loader}>Loading...</div>;
  }

  return (
    <main className={styles.container}>
      <h1 className={`{styles.title} h1`}>Mobile phones</h1>
      <p className={styles.count}>{products.length} models</p>

      <div className={styles.productList}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} variant="full" />
        ))}
      </div>
    </main>
  );
};
