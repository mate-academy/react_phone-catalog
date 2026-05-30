import { BrandNewModels } from '../BrandNewModels';
import { HotPrices } from '../HotPrices';
import { ShopByCategory } from '../ShopByCategory/ShopByCategory';
import { Header } from '../Header';
import styles from './MainContent.module.scss';

export const MainContent = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <BrandNewModels />
        <ShopByCategory />
        <HotPrices />
      </main>
    </>
  );
};
