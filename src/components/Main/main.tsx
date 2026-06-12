import styles from './Main.module.scss';
import { BannerSlider } from '../../Functional/BannerSlider/BannerSlider';
// eslint-disable-next-line max-len
import { BrandNewModels } from '../../Functional/BrandNewModels';
import { CartProvider } from '../../context/CartContext';
import { ShopByCategory } from '../../Functional/ShopByCategory/ShopByCategory';
// import { HotPrice } from '../../Functional/HotPrice/HotPrice';

export const Main: React.FC = () => {
  return (
    <main className={styles.main}>
      <div className={styles.mainDiv}>
        <h1 className={styles.mainWellcome}>Welcome to Nice Gadgets store!</h1>
      </div>
      <CartProvider>
        <BannerSlider />
        <BrandNewModels />
        <ShopByCategory />
        {/* <HotPrice /> */}
      </CartProvider>
    </main>
  );
};
