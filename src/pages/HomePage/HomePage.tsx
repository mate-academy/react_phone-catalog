import { BannerSlider } from './components/BannerSlider';
import { BrandNewModels } from './components/BrandNewModels';
import { HotPrices } from './components/HotPrices';
import { ProductsStatus } from './components/ProductsStatus';
import { ShopByCategory } from './components/ShopByCategory';
import styles from './HomePage.module.scss';

export const HomePage = () => (
  <div className={styles.container}>
    <h1 className={styles.visuallyHidden}>Product Catalog</h1>
    <ProductsStatus />
    <BannerSlider />
    <BrandNewModels />
    <ShopByCategory />
    <HotPrices />
  </div>
);
