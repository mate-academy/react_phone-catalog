import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.scss';
import { Product } from '../../types';
import { getProducts } from '../../utils/fetchClient';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Loader } from '../../components/Loader';
import { PicturesSlider } from './components/PicturesSlider';
import { ShopByCategory } from './components/ShopByCategory';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const hotPriceProducts = [...products]
    .filter(p => p.fullPrice > p.price)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

  const brandNewProducts = [...products].sort(
    (a, b) => b.year - a.year || b.fullPrice - a.fullPrice,
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Product Catalog</h1>

      <div className={styles.section}>
        <PicturesSlider />
      </div>

      <div className={styles.section}>
        <ProductsSlider title="Hot prices" products={hotPriceProducts} />
      </div>

      <div className={styles.section}>
        <ShopByCategory products={products} />
      </div>

      <div className={styles.section}>
        <ProductsSlider title="Brand new models" products={brandNewProducts} />
      </div>
    </div>
  );
};
