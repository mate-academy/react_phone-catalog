import { useMemo } from 'react';

import { getProducts } from '../shared/api/apiClient';
import { Loader } from '../shared/components/Loader';
import { PicturesSlider } from '../shared/components/PicturesSlider';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { ShopByCategory } from '../shared/components/ShopByCategory';
import { useAsync } from '../shared/hooks/useAsync';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const { data: products, loading, error, reload } = useAsync(getProducts);

  const hotPriceProducts = useMemo(() => {
    if (!products) {
      return [];
    }

    return [...products]
      .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
      .slice(0, 16);
  }, [products]);

  const brandNewProducts = useMemo(() => {
    if (!products) {
      return [];
    }

    return [...products].sort((a, b) => b.year - a.year).slice(0, 16);
  }, [products]);

  const categoryCounts = useMemo(() => {
    if (!products) {
      return { phones: 0, tablets: 0, accessories: 0 };
    }

    return {
      phones: products.filter(p => p.category === 'phones').length,
      tablets: products.filter(p => p.category === 'tablets').length,
      accessories: products.filter(p => p.category === 'accessories').length,
    };
  }, [products]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className="visually-hidden">Product Catalog</h1>
        <h2 className={styles.heading}>Welcome to Nice Gadgets store!</h2>
      </div>

      <div className={styles.container}>
        <section
          className={styles.picturesSlider}
          aria-label="Featured products"
        >
          <PicturesSlider />
        </section>
      </div>

      <div className={styles.container}>
        <section className={styles.section} aria-labelledby="brand-new-title">
          {loading && <Loader />}

          {error && (
            <p className={styles.error}>
              {error}{' '}
              <button type="button" onClick={reload}>
                Try again
              </button>
            </p>
          )}

          {!loading && !error && (
            <ProductsSlider
              title="Brand new models"
              titleId="brand-new-title"
              products={brandNewProducts}
              showFullPrice={false}
            />
          )}
        </section>

        <section className={styles.section} aria-labelledby="categories-title">
          <h2 id="categories-title" className={styles.sectionTitle}>
            Shop by category
          </h2>

          <ShopByCategory counts={categoryCounts} />
        </section>

        <section className={styles.section} aria-labelledby="hot-prices-title">
          {loading && <Loader />}

          {error && (
            <p className={styles.error}>
              {error}{' '}
              <button type="button" onClick={reload}>
                Try again
              </button>
            </p>
          )}

          {!loading && !error && (
            <ProductsSlider
              title="Hot prices"
              titleId="hot-prices-title"
              products={hotPriceProducts}
            />
          )}
        </section>
      </div>
    </div>
  );
};
