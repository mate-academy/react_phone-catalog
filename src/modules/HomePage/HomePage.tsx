import { WelcomeSlider } from './components/WelcomeSlider';
import { ProductsSlider } from './components/ProductsSlider';
import { ShopByCategory } from './components/ShopByCategory';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Product Catalog</h1>
      <WelcomeSlider />
      <ProductsSlider title="Hot prices" />
      <ShopByCategory />
      <ProductsSlider title="Brand new" />
    </div>
  );
};
