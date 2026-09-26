import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { PicturesSlider } from '../../components/PicturesSlider/PicturesSlider';
import styles from './HomePage.module.scss';
import { useLanguage } from '../../components/context/LanguageContext';

export const HomePage = () => {
  const { t } = useLanguage();

  return (
    <main>
      <h1 className="visually-hidden">Product Catalog</h1>
      <PicturesSlider />
      <section className={styles.models}>
        <ProductsSlider title={t('BrandNewModels')} type="new" />
      </section>
      <ShopByCategory />
      <section className={styles.models}>
        <ProductsSlider title={t('HotPrices')} type="hot" />
      </section>
    </main>
  );
};
