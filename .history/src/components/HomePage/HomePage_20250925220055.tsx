import { PicturesSlider } from './PicturesSlider';
import { ProductsSlider } from './ProductsSlider';
import { HotPrices } from './HotPrices';
import { ShopByCategory } from './ShopByCategory';
import styles from './PicturesSlider.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.co}>
      <PicturesSlider />
      <ProductsSlider />
      <ShopByCategory />
      <HotPrices />
    </div>
  );
};
