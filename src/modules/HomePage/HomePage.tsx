import { useTranslation } from 'react-i18next';
import styles from './HomePage.module.scss';
import { SLIDER_COUNT } from '../constants';
import HomeSlider from './HomeSlider';
import HomeCatalog from './HomeCatalog';
import HomeCategories from './HomeCategories';
import { useContext } from 'react';
import { getSortedProducts } from '../../utils/catalog';
import { ProductCatalogContext } from '../../ProductsContext';

export const HomePage = () => {
  const { t } = useTranslation();
  const { products, loading, loaded, error } = useContext(
    ProductCatalogContext,
  );

  const brandNewProducts = loaded
    ? getSortedProducts(products, 'newest').slice(0, SLIDER_COUNT)
    : [];
  const hotPricesProducts = loaded
    ? getSortedProducts(products, 'hotPrice').slice(0, SLIDER_COUNT)
    : [];

  return (
    <div className="container">
      <div id="top"></div>
      <div className={styles.homePage}>
        <div>
          <h2 className={styles.homePage__title}>
            {t('home.welcome_to_store')}
          </h2>

          <HomeSlider />
        </div>

        {error && 'Something went wrong!'}
        {loading && 'Loading'}

        {loaded && (
          <>
            <HomeCatalog
              title={t('home.brand_new')}
              products={brandNewProducts}
            />
            <HomeCategories />
            <HomeCatalog
              title={t('home.hot_prices')}
              products={hotPricesProducts}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
