import { WelcomeSlider } from './components/WelcomeSlider';
import { ProductsSlider } from './components/ProductsSlider';
import { ShopByCategory } from './components/ShopByCategory';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.hiddenTitle}>Product Catalog</h1>
      <h2 className={styles.pageTitle}>Welcome to Nice Gadgets store!</h2>

      <WelcomeSlider />
      <ProductsSlider title="Brand new models" type="brand-new" />

      <ShopByCategory />
      <ProductsSlider title="Hot prices" type="hot-prices" />
    </div>
  );
};
