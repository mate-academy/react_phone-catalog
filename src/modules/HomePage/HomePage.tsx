import { useEffect, useState } from 'react';
import styles from './HomePage.module.scss';
import { PicturesSlider } from './components/PicturesSlider';
import { ProductsSlider } from './components/ProductsSlider';
import { ShopByCategory } from './components/ShopByCategory';
import { getProducts } from '../shared/api';
import { Product } from '../shared/types';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setErrorMessage(`Can't get products`));
  }, []);

  const productsByDiscount = products.sort((a, b) => {
    const discountA = a.fullPrice - a.price;
    const discountB = b.fullPrice - b.price;

    return discountB - discountA;
  });

  return errorMessage ? (
    <h1>{errorMessage}</h1>
  ) : (
    <div className={styles.homePage}>
      <h1 className={styles.welcomeTitle}>Welcome to Nice Gadgets store!</h1>
      <PicturesSlider />
      <ShopByCategory products={products} />
      <ProductsSlider title={`Hot prices`} products={productsByDiscount} />
    </div>
  );
};
