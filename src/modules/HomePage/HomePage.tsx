import { PicturesSlider } from './components/PicturesSlider';
import { ProductsSlider } from './components/ProductsSlider';
import { ShopByCategory } from './components/ShopByCategory';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.page}>
      <PicturesSlider />
      <ProductsSlider title="Hot prices" />
      <ShopByCategory />
      <ProductsSlider title="Brand new" />
    </div>
  );
};
