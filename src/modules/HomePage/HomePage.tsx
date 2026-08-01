import { useEffect, useMemo, useState } from 'react';
import { Product } from '@shared/types';
import {
  getBrandNewProducts,
  getHotPriceProducts,
  getProducts,
} from '@shared/api';
import { useTranslation } from '@shared/context';
import { ProductsSlider } from '@shared/components/ProductsSlider';
import { ProductsListSkeleton } from '@shared/components/ProductsListSkeleton';
import { PicturesSlider } from './components/PicturesSlider';
import { ShopByCategory } from './components/ShopByCategory';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const { t } = useTranslation();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadProducts = () => {
    setIsLoading(true);
    setHasError(false);

    getProducts()
      .then(setProducts)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(loadProducts, []);

  const brandNewProducts = useMemo(
    () => getBrandNewProducts(products),
    [products],
  );

  const hotPriceProducts = useMemo(
    () => getHotPriceProducts(products),
    [products],
  );

  return (
    <div className={styles.page}>
      <h1 className="visually-hidden">{t('home.title')}</h1>

      <section className={styles.hero}>
        <h2 className={styles.title}>{t('home.welcome')}</h2>

        <PicturesSlider />
      </section>

      {isLoading && (
        <div className={styles.skeleton}>
          <ProductsListSkeleton count={4} />
        </div>
      )}

      {!isLoading && hasError && (
        <div className={styles.error}>
          <p>{t('common.somethingWentWrong')}</p>

          <button
            type="button"
            className={styles.reloadButton}
            onClick={loadProducts}
          >
            {t('common.reload')}
          </button>
        </div>
      )}

      {!isLoading && !hasError && (
        <>
          <ProductsSlider
            title={t('home.brandNew')}
            products={brandNewProducts}
          />

          <ShopByCategory products={products} />

          <ProductsSlider
            title={t('home.hotPrices')}
            products={hotPriceProducts}
            showDiscount
          />
        </>
      )}
    </div>
  );
};
