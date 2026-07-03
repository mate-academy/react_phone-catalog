import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

import styles from './HomePage.module.scss';
import { useLanguage } from '../../context/LanguageContext';

import { Product } from '../../types/Product';
import { getProducts } from '../../utils/api';
import { PicturesSlider } from '../../components/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Loader } from '../../components/Loader';
import { getAssetUrl } from '../../utils/helpers';

export const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();

      setProducts(data);
    } catch (err) {
      setError(t('home.error'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    document.title = t('home.documentTitle');
    loadData();
  }, [t, loadData]);

  if (loading) {
    return (
      <div className="container">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="container"
        style={{ textAlign: 'center', padding: '80px 0' }}
      >
        <p style={{ marginBottom: '24px', fontSize: '18px', fontWeight: 600 }}>
          {error}
        </p>
        <button
          type="button"
          onClick={loadData}
          style={{
            padding: '12px 24px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: 'var(--color-accent)',
            color: 'var(--color-accent-text)',
            cursor: 'pointer',
            fontWeight: 700,
          }}
        >
          {t('home.reload')}
        </button>
      </div>
    );
  }

  const hotPriceProducts = [...products]
    .filter(p => p.fullPrice > p.price)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

  const brandNewProducts = [...products]
    .filter(p => p.price === p.fullPrice)
    .sort((a, b) => b.year - a.year);

  const phonesCount = products.filter(p => p.category === 'phones').length;
  const tabletsCount = products.filter(p => p.category === 'tablets').length;
  const accessoriesCount = products.filter(
    p => p.category === 'accessories',
  ).length;

  return (
    <div className={`${styles.homePage} container`}>
      <h1 className="sr-only">{t('home.title')}</h1>

      <PicturesSlider />

      {brandNewProducts.length > 0 && (
        <ProductsSlider
          products={brandNewProducts}
          title={t('home.brandNewTitle')}
        />
      )}

      <section className={styles.categoriesSection}>
        <h2 className={styles.categoryTitle}>{t('home.shopByCategory')}</h2>
        <div className={styles.categoryGrid}>
          <Link to="/phones" className={styles.categoryCard}>
            <div className={styles.imageWrapper}>
              <img
                src={getAssetUrl('img/category-phones.webp')}
                alt="Phones category"
                loading="lazy"
              />
            </div>
            <h3 className={styles.cardTitle}>{t('categories.phones')}</h3>
            <span className={styles.countLabel}>
              {phonesCount === 1
                ? t('home.modelsCount_1', { count: phonesCount })
                : t('home.modelsCount', { count: phonesCount })}
            </span>
          </Link>

          <Link to="/tablets" className={styles.categoryCard}>
            <div className={styles.imageWrapper}>
              <img
                src={getAssetUrl('img/category-tablets.webp')}
                alt="Tablets category"
                loading="lazy"
              />
            </div>
            <h3 className={styles.cardTitle}>{t('categories.tablets')}</h3>
            <span className={styles.countLabel}>
              {tabletsCount === 1
                ? t('home.modelsCount_1', { count: tabletsCount })
                : t('home.modelsCount', { count: tabletsCount })}
            </span>
          </Link>

          <Link to="/accessories" className={styles.categoryCard}>
            <div className={styles.imageWrapper}>
              <img
                src={getAssetUrl('img/category-accessories.webp')}
                alt="Accessories category"
                loading="lazy"
              />
            </div>
            <h3 className={styles.cardTitle}>{t('categories.accessories')}</h3>
            <span className={styles.countLabel}>
              {accessoriesCount === 1
                ? t('home.modelsCount_1', { count: accessoriesCount })
                : t('home.modelsCount', { count: accessoriesCount })}
            </span>
          </Link>
        </div>
      </section>

      {hotPriceProducts.length > 0 && (
        <ProductsSlider
          products={hotPriceProducts}
          title={t('home.hotPricesTitle')}
        />
      )}
    </div>
  );
};
