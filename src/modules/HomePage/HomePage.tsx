import { useTranslation } from 'react-i18next';
import styles from './HomePage.module.scss';
import { SLIDER_COUNT } from '../constants';
import HomeSlider from './HomeSlider';
import CatalogSlider from '../shared/CatalogSlider';
import HomeCategories from './HomeCategories';
import { useContext } from 'react';
import { getSortedProducts, ProductSortTypes } from '../../utils/catalog';
import { ProductCatalogContext } from '../../ProductCatalogContext';
import Message from '../shared/Message';

export const HomePage = () => {
  const { t } = useTranslation();
  const { products, loading, loaded, error } = useContext(
    ProductCatalogContext,
  );

  const brandNewProducts = loaded
    ? getSortedProducts(products, ProductSortTypes.Age).slice(0, SLIDER_COUNT)
    : [];
  /* eslint-disable @typescript-eslint/indent */
  const hotPricesProducts = loaded
    ? getSortedProducts(products, ProductSortTypes.HotPrice).slice(
        0,
        SLIDER_COUNT,
      )
    : [];
  /* eslint-enable @typescript-eslint/indent */

  return (
    <div className="container">
      <div id="top"></div>
      <div className={styles.homePage}>
        <h1 className={'visually-hidden'}>{t('home.title')}</h1>

        <div>
          <h2 className={styles.homePage__title}>
            {t('home.welcome_to_store')}
          </h2>

          <HomeSlider />
        </div>

        {error && <Message type="error" />}
        {loading && 'Loading'}

        {loaded && (
          <>
            <CatalogSlider
              title={t('home.brand_new')}
              products={brandNewProducts}
              showDiscount={false}
            />
            <HomeCategories />
            <CatalogSlider
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
