import { Categories } from '../../components/Categories';
import { ProductsSlider } from '../../components/ProductsSlider';
import styles from './HomePage.module.scss';
import { PicturesSlider } from './PicturesSlider/PicturesSlider';
import { useAppState } from '../../contexts/AppContext';
import { getTranslation } from '../shared/utils/getTranslation';

export const HomePage: React.FC = () => {
  const { language } = useAppState();
  const t = getTranslation(language);

  return (
    <main className={styles.main}>
      <h1 className={styles.homeTitle}>Product Catalog</h1>
      <div className={styles.header}>
        <h2 className={styles.title}>{t.homePage.welcomeMessage}</h2>
        <PicturesSlider />
      </div>

      <ProductsSlider title={t.homePage.newModelsTitle} filter="year" />
      <Categories />
      <ProductsSlider title={t.homePage.hotPricesTitle} filter="price" />
    </main>
  );
};
