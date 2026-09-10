import styles from './HomePage.module.scss';
import { PicturesSlider } from './components/PicturesSlider';

import { ProductsSlider } from '../../shared/components/ProductsSlider';
import { ShopByCategory } from './components/ShopByCategory';
import { Categories } from '@/types/Categories';
import { useMemo } from 'react';
import { ModelsCount } from '@/types/ModelsCount';
import { useProducts } from '@/shared/hooks/useProducts';
import { PageError } from '@/shared/components/PageError';

export const HomePage = () => {
  const productsState = useProducts();

  const modelsCount: ModelsCount = useMemo(
    () =>
      productsState.products.reduce(
        (acc, product) => ({
          ...acc,
          [product.category]: acc[product.category] + 1,
        }),
        Object.fromEntries(
          Object.values(Categories).map(category => [category, 0]),
        ) as ModelsCount,
      ),
    [productsState.products],
  );

  const newestModels = useMemo(
    () =>
      [...productsState.products].sort(
        (modelA, modelB) => modelB.year - modelA.year,
      ),
    [productsState.products],
  );

  const cheapestModels = useMemo(
    () =>
      [...productsState.products].sort((modelA, modelB) => {
        const modelAdiff = modelA.fullPrice - modelA.price;
        const modelBdiff = modelB.fullPrice - modelB.price;

        return modelBdiff - modelAdiff;
      }),
    [productsState.products],
  );

  return (
    <main className={styles.homePage}>
      <section className={styles.heroSection}>
        <h1 className={styles.hiddenTitle}>Product Catalog</h1>

        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>{'Welcome to Nice\n Gadgets store!'}</h2>
        </div>

        <PicturesSlider />
      </section>

      {productsState.hasError ? (
        <PageError reloadFunction={productsState.retryFetch} />
      ) : (
        <section className={styles.content}>
          <ProductsSlider
            title={'Brand new\n models'}
            products={newestModels}
            isLoading={productsState.isLoading}
          />

          <ShopByCategory
            modelsCount={modelsCount}
            isLoading={productsState.isLoading}
          />

          <ProductsSlider
            title="Hot prices"
            products={cheapestModels}
            isLoading={productsState.isLoading}
          />
        </section>
      )}
    </main>
  );
};
