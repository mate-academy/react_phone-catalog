import { useEffect, useState } from 'react';
import { getBrandNew, getHotPrices, getProducts } from '../../api';
import { Product } from '../../types';
import { useProductCounts } from '../../hooks/useProductCounts';
import styles from './HomePage.module.scss';
import { ProductCard } from '../shared/components/ProductCard';
import { Loader } from '../shared/components/Loader';
import { ShopByCategory } from './components/ShopByCategory';
import { PicturesSlider } from './components/PicturesSlider';

export const HomePage = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [brandNew, setBrandNew] = useState<Product[]>([]);
  const [hotPrices, setHotPrices] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const counts = useProductCounts(allProducts);

  useEffect(() => {
    setLoading(true);
    setError(false);

    Promise.all([getProducts(), getBrandNew(), getHotPrices()])
      .then(([allData, brandNewData, hotPricesData]) => {
        setAllProducts(allData);
        setBrandNew(brandNewData.slice(0, 5));
        setHotPrices(hotPricesData.slice(0, 5));
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className={styles.homePage}>
      <h1 className={styles.productCatalog}>Product Catalog</h1>

      <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>

      <div className={styles.sections}>
        <section className={styles.section}>
          <PicturesSlider />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Brand new models</h2>

          {loading && <Loader />}
          {!loading && error && <p>Something went wrong. Please try again.</p>}
          {!loading && !error && (
            <ul className={styles.cardGrid}>
              {brandNew.map(product => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Shop by category</h2>
          {loading && <Loader />}
          {!loading && error && <p>Something went wrong. Please try again.</p>}
          {!loading && !error && <ShopByCategory counts={counts} />}
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Hot prices</h2>

          {loading && <Loader />}
          {!loading && error && <p>Something went wrong. Please try again.</p>}
          {!loading && !error && (
            <ul className={styles.cardGrid}>
              {hotPrices.map(product => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};
