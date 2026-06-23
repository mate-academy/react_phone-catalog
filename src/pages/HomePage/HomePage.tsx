import { useMemo } from 'react';
import { useProducts } from '../../context/ProductsContext';
import { useT } from '../../context/LanguageContext';
import { PicturesSlider } from '../../components/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory';
import { Loader } from '../../components/Loader';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const { products, loading, error } = useProducts();
  const t = useT();

  const hotPrices = useMemo(
    () =>
      [...products]
        .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
        .slice(0, 16),
    [products],
  );

  const brandNew = useMemo(
    () =>
      [...products]
        .filter(p => p.fullPrice === p.price || p.year >= 2018)
        .sort((a, b) => b.year - a.year || b.fullPrice - a.fullPrice)
        .slice(0, 16),
    [products],
  );

  return (
    <div className={styles.page}>
      <h1 className={styles.h1}>{t('home.title')}</h1>
      <PicturesSlider />

      {loading && <Loader />}
      {error && (
        <p className={styles.error}>
          {t('common.failedToLoad')}: {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <ProductsSlider
            title={t('home.brandNew')}
            products={brandNew}
            showDiscount={false}
          />
          <ShopByCategory />
          <ProductsSlider title={t('home.hotPrices')} products={hotPrices} />
        </>
      )}
    </div>
  );
};
