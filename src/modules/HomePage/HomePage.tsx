import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './HomePage.module.scss';
import { Product } from '../shared/types';
import { ProductsList } from '../CategoryPage/components/ProductsList/ProductsList';
import { PictureSlider } from './components/PictureSlider';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [hotProducts, setHotProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          .slice(0, 8);

        const newest = allProducts
          .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
          .slice(0, 8);

        setHotProducts(hot);
        setNewProducts(newest);
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
      <PictureSlider />
      <section className={styles.section}>
        <h2>{t('hotPrices')}</h2>
        <ProductsList products={hotProducts} />
      </section>
      <section className={styles.section}>
        <h2>{t('newProducts')}</h2>
        <ProductsList products={newProducts} />
      </section>
    </div>
  );
};
