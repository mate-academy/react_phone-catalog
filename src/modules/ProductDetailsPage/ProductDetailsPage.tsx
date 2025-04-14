import styles from './ProductDetailsPage.module.scss';

import { CurrentPage } from '../../shared/components/CurrentPage';
import { ProductsSlider } from '../../shared/components/ProductsSlider';
import { ProductInfo } from './components/ProductInfo';
import { ProductOverview } from './components/ProductOverview';

import { SectionTitles } from '../../shared/constants/sectionTitles';

export const ProductDetailsPage = () => {
  return (
    <main className={styles.details}>
      <div className={styles.details__container}>
        <CurrentPage />
        <ProductOverview />
        <ProductInfo />
      </div>
      <ProductsSlider title={SectionTitles.AlsoLike} />
    </main>
  );
};
