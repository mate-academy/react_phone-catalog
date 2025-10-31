import { useTranslation } from 'react-i18next';
import styles from './HomePage.module.scss';
import Slider from './Slider';
import HomeCatalog from './HomeCatalog';
import { Product } from '../../types/Product';
import products from '../../../public/api/products.json';
import { SLIDER_COUNT } from '../constants';

const getBrandNewProducts = (allProducts: Product[]): Product[] => {
  return allProducts.sort((a, b) => b.year - a.year).slice(0, SLIDER_COUNT);
};

const getHotPriceProducts = (allProducts: Product[]): Product[] => {
  return allProducts
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, SLIDER_COUNT);
};

export const HomePage = () => {
  const { t } = useTranslation();

  const brandNewProducts = getBrandNewProducts(products);
  const hotPricesProducts = getHotPriceProducts(products);

  return (
    <div className={styles.container}>
      <h2 className={[styles.header__title].join(' ')}>
        {t('home.welcome_to_store')}
      </h2>

      <div className={styles['slider-wrapper']}>
        <Slider />
        <HomeCatalog title={t('home.brand_new')} products={brandNewProducts} />
        <HomeCatalog
          title={t('home.hot_prices')}
          products={hotPricesProducts}
        />
      </div>
    </div>
  );
};

export default HomePage;
