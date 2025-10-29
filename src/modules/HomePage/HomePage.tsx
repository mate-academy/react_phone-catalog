import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './HomePage.module.scss';
import { Product } from '../shared/types';
import { ProductSlider } from './components/productSlider';
import { PictureSlider } from './components/pictureSlider';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [hotProducts, setHotProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<{
    [key: string]: Product[];
  }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const banners = [
    'img/banner-accessories.png',
    'img/banner-phones.png',
    'img/banner-tablets.png',
    'img/Banner.png',
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [phonesResp, tabletResp, accessoriesResp] = await Promise.all([
          fetch('api/phones.json'),
          fetch('api/tablets.json'),
          fetch('api/accessories.json'),
        ]);

        if (!phonesResp.ok || !tabletResp.ok || !accessoriesResp.ok) {
          throw new Error('Failed to fetch one or more product files');
        }

        const [phonesData, tabletsData, accessoriesData] = await Promise.all([
          phonesResp.json(),
          tabletResp.json(),
          accessoriesResp.json(),
        ]);

        const allProducts: Product[] = [
          ...phonesData,
          ...tabletsData,
          ...accessoriesData,
        ].map(item => ({
          ...item,
          priceDiscount: item.priceDiscount ?? item.price,
          priceRegular: item.priceRegular ?? item.fullPrice,
        }));

        const hot = allProducts
          .filter(
            p =>
              (p.priceDiscount || p.priceRegular) <
              (p.priceRegular ?? p.fullPrice),
          )
          .sort(
            (a, b) =>
              (b.priceRegular ?? b.priceRegular) -
              (a.priceRegular ?? a.fullPrice) -
              (a.priceDiscount ?? a.priceRegular),
          )
          .slice(0, 10);

        const newest = allProducts
          .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
          .slice(0, 10);

        const categories = {
          phones: phonesData,
          tablets: tabletsData,
          accessories: accessoriesData,
        };

        setHotProducts(hot);
        setNewProducts(newest);
        setCategoryProducts(categories);
        setLoading(false);
      } catch (err) {
        setError(t('errorLoading'));
        setLoading(false);
      }
    };

    fetchProducts();
  }, [t]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.home}>
      <h1 className={styles.welcome}>{t('welcome')}</h1>
      <PictureSlider banners={banners} />
      <section className={styles.section}>
        <h2>{t('newProducts')}</h2>
        <ProductSlider products={newProducts} />
      </section>
      <section className={styles.categorySection}>
        <h2 className={styles.categoryTitle}>{t('shopByCategory')}</h2>
        <div className={styles.categoryGrid}>
          {Object.entries(categoryProducts).map(([category, products]) => (
            <div key={category} className={styles.categoryItem}>
              <Link to={`/category/${category}`}>
                {products[0]?.images?.[0] ? (
                  <img
                    src={products[0].images[0]}
                    alt={`${category} example`}
                    className={styles.categoryImage}
                  />
                ) : (
                  <img
                    src="/img/product-not-found.png"
                    alt={`${category} not found`}
                    className={styles.categoryImage}
                  />
                )}
              </Link>
              <div className={styles.categoryInfo}>
                <span className={styles.categoryName}>{t(category)}</span>
                <span className={styles.categoryCount}>
                  {products.length}
                  <br />
                  {t('models')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.section}>
        <h2 className={styles.hotPrices}>{t('hotPrices')}</h2>
        <ProductSlider products={hotProducts} />
      </section>
    </div>
  );
};
