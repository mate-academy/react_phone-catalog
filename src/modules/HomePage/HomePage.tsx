import { PicturesSlider } from '../../components/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory';
import { useLanguage } from '../../context/LanguageContext';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const { t } = useLanguage();

  return (
    <div className={styles.homePage}>
      <div className="container">
        <h1 className="visually-hidden">{t('home.catalog')}</h1>

        <h2 className={styles.title}>{t('home.welcome')}</h2>

        <PicturesSlider />

        <ProductsSlider title={t('home.brandNew')} sortBy="newest" />

        <ShopByCategory />

        <ProductsSlider title={t('home.hotPrices')} sortBy="discount" />
      </div>
    </div>
  );
};
