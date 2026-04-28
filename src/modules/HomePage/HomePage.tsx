import { useEffect, useState } from 'react';
import { getProducts } from '../../api';
import { Product } from '../../types';
import styles from './HomePage.module.scss';
import { ProductCard } from '../shared/components/ProductCard';
import { Loader } from '../shared/components/Loader';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    getProducts()
      .then(setProducts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const phones = products.filter(p => p.category === 'phones');

  return (
    <main className={styles.homePage}>
      <h1 className={styles.productCatalog}>Product Catalog</h1>

      <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>

      <div className={styles.sections}>
        <section className={styles.section}>
          {/* PicturesSlider — separate component later */}
          <div className={styles.sliderPlaceholder}>Pictures Slider</div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Brand new models</h2>

          {loading && <Loader />}

          {!loading && error && <p>Something went wrong. Please try again.</p>}

          {!loading && !error && (
            <ul className={styles.cardGrid}>
              {phones.map(phone => (
                <li key={phone.id}>
                  <ProductCard product={phone} />
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Shop by category</h2>
          {/* CategoryLinks — separate component later */}
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Hot prices</h2>
          {/* ProductsSlider — separate component later */}
        </section>
      </div>
    </main>
  );
};
