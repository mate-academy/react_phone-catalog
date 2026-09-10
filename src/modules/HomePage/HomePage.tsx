import React, { useEffect, useState, useMemo } from 'react';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/products';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { ShopByCategory } from './components/ShopByCategory';
import { PicturesSlider } from './components/PicturesSlider';
import { Loader } from '../../components/Loader';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      // eslint-disable-next-line no-console
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const hotPricesProducts = useMemo(() => {
    return products
      .filter(p => p.fullPrice > p.price)
      .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));
  }, [products]);

  const brandNewProducts = useMemo(() => {
    return [...products].sort((a, b) => b.year - a.year);
  }, [products]);

  return (
    <div className={styles.homePage}>
      <h1 className={styles.homePage__title}>Product Catalog</h1>

      <PicturesSlider />

      {loading ? (
        <Loader />
      ) : (
        <>
          <ProductsSlider
            title="Brand new models"
            products={brandNewProducts}
          />
          <ShopByCategory products={products} />
          <ProductsSlider title="Hot prices" products={hotPricesProducts} />
        </>
      )}
    </div>
  );
};
