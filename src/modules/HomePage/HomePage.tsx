import { useMemo } from 'react';

import { BannerSlider } from '../../components/BannerSlider';
import { Loader } from '../../components/Loader';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory';
import { useStore } from '../../context/StoreContext';

import styles from './HomePage.module.scss';

export const HomePage = () => {
  const { products, isLoading, error, reloadProducts } = useStore();

  const brandNewProducts = useMemo(() => {
    return [...products]
      .sort((productA, productB) => {
        return productB.year - productA.year || productB.id - productA.id;
      })
      .slice(0, 12);
  }, [products]);

  return (
    <section className={styles.homePage}>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>

      <BannerSlider />

      {isLoading && <Loader />}

      {!isLoading && error && (
        <div className={styles.message}>
          <p>{error}</p>

          <button type="button" onClick={reloadProducts}>
            Reload
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <>
          <ProductsSlider
            title="Brand new models"
            products={brandNewProducts}
          />

          <ShopByCategory products={products} />
        </>
      )}
    </section>
  );
};
