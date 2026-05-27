import { useEffect, useState } from 'react';
import { Footer } from '../shared/components/Layout/Footer';
import { Header } from '../shared/components/Layout/Header';
import { ProductList } from '../shared/components/ProductsList';
import { Product } from '../../types/product';
import { getProducts } from '../../services/product.api';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then(data => setProducts(data.slice(0, 4)))
      .catch(() => {});
  });

  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>
      <ProductList products={products} />
      <Footer />
    </div>
  );
};
