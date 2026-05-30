import { PicturesSlider } from './PicturesSlider';
import { ProductsSlider } from './ProductsSlider';
import { HotPrices } from './HotPrices';
import { ShopByCategory } from './ShopByCategory';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <PicturesSlider />
      <ProductsSlider />
      <ShopByCategory />
      <HotPrices />
    </div>
  );
};
