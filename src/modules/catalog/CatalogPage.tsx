import React, { useEffect, useState } from 'react';
import { Product } from '../../types/product';
import { getProducts } from '../../services/product.api';
import styles from './CatalogPage.module.scss';
import { ProductList } from '../shared/components/ProductsList';
import { Footer } from '../shared/components/Layout/Footer';
import { Header } from '../shared/components/Layout/Header';

export const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');

    getProducts()
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        setErrorMessage(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className={styles.loader}>Loading products...</p>;
  }

  if (errorMessage) {
    return <p className={styles.error}>{errorMessage}</p>;
  }

  return (
    <div className="section">
      <Header />
      <main>
        <h1 className={styles.title}>Product Catalog</h1>
        <ProductList products={products} />
      </main>
      <Footer />
    </div>
  );
};
