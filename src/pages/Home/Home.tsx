import styles from './Home.module.scss';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';
import { BrandNewModels } from '../../components/BrandNewModels/BrandNewModels';
import { HotPrices } from '../../components/HotPrices/HotPrices';

export const Home = () => {
  return (
    <main>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1 className={styles.h1_title}>
            {/* Welcome to Nice Gadgets&nbsp;store! */}
            Product Catalog
          </h1>
        </div>
      </div>
      <ProductSlider />

      <div className={styles.container}>
        <BrandNewModels />
        <ShopByCategory />
        <HotPrices />
      </div>
    </main>
  );
};
