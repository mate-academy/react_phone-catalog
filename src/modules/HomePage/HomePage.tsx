import { useEffect, useState } from 'react';
import { getProducts } from '../../api';
import { Product } from '../../types';
import { useProductCounts } from '../../hooks';
import styles from './HomePage.module.scss';
import { ProductCard } from '../shared/components/ProductCard';
import { Loader } from '../shared/components/Loader';
import { ShopByCategory } from './components/ShopByCategory';
import { PicturesSlider } from './components/PicturesSlider';

const BANNER_SLIDES = [
  { id: 1, image: '/img/banner-phones.png', alt: 'New phones — latest models' },
  {
    id: 2,
    image: '/img/banner-tablets.png',
    alt: 'New tablets — power and portability',
  },
  {
    id: 3,
    image: '/img/banner-accessories.png',
    alt: 'Accessories — complete your setup',
  },
];

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

    getProducts()
      .then(all => {
        setAllProducts(all);

        setBrandNew([...all].sort((a, b) => b.year - a.year).slice(0, 5));

        setHotPrices(
          [...all]
            .filter(p => p.fullPrice > p.price)
            .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
            .slice(0, 5),
        );
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.homePage}>
      <h1 className={styles.productCatalog}>Product Catalog</h1>

      <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>

      <div className={styles.sections}>
        <section className={styles.section}>
          <PicturesSlider slides={BANNER_SLIDES} />
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
    </div>
  );
};
