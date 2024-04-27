import styles from './HomePage.module.scss';
import { BrandNew } from '../BrandNew/BrandNew';
import { ProductCategory } from '../ProductCategory/ProductCategory';
import { SliderTop } from '../SliderTop/SliderTop';
import { HotPrices } from '../HotPrices/HotPrices';

export const HomePage = () => {
  return (
    <main className={styles.main}>
      <SliderTop />
      <BrandNew />
      <ProductCategory />
      <HotPrices />
    </main>
  );
};
