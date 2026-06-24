import styles from './Home.module.scss';
import { BannerSlider } from '../../Functional/BannerSlider/BannerSlider';
import { BrandNewModels } from '../../Functional/BrandNewModels';
import { ShopByCategory } from '../../Functional/ShopByCategory/ShopByCategory';
import { HotPrice } from '../../Functional/HotPrice/HotPrice';

export const HomePage = () => {
  return (
    <div>
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>
      <main className={styles.main}>
        <div className={styles.mainDiv}>
          <h1 className={styles.mainWellcome}>
            Welcome to Nice Gadgets store!
          </h1>
        </div>
        <BannerSlider />
        <BrandNewModels />
        <ShopByCategory />
        <HotPrice />
      </main>
    </div>
  );
};
