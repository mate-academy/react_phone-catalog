import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import {
  fetchListProducts,
  getBrandNewProducts,
  getHotPriceProducts,
} from '../../services/products';
import { ProductsSlider } from './components/ProductsSlider';
import { PicturesSlider } from './components/PicturesSlider';
import { CategoryLinks } from './components/CategoryLinks';
import { getAssetPath } from '../../utils/assets';
import styles from './HomePage.module.scss';
import type { Product } from '../../types';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [hotPriceProducts, setHotPriceProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    Promise.all([fetchListProducts(), getHotPriceProducts()])
      .then(([loadedProducts, loadedHotProducts]) => {
        setProducts(loadedProducts);
        setHotPriceProducts(loadedHotProducts);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className={styles.empty}>
        Something went wrong. Please try again later.
      </div>
    );
  }

  const brandNewProducts = getBrandNewProducts(products, 8);
  const slides = [
    getAssetPath('img/figma/banner-iphone-14-pro.png'),
    getAssetPath('img/figma/hero-iphone-11-pro-green.png'),
    getAssetPath('img/figma/hero-iphone-11-red.png'),
  ];

  return (
    <main className={styles.page}>
      <h1>Welcome to Nice Gadgets store!</h1>
      <section className={styles.hero}>
        <PicturesSlider images={slides} />
      </section>
      <section className={styles.section}>
        <ProductsSlider
          title="Brand new models"
          products={brandNewProducts}
          showDiscount={false}
        />
      </section>
      <section className={styles.section}>
        <h2>Shop by category</h2>
        <CategoryLinks />
      </section>
      <section className={styles.section}>
        <ProductsSlider title="Hot prices" products={hotPriceProducts} />
      </section>
    </main>
  );
};
