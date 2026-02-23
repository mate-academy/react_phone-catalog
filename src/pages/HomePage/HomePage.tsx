import styles from './HomePage.module.scss';
import { ShopByCategory } from '../../components/ShopByCategory';
import { ProductСarousel } from '../../components/ProductСarousel';
import ImageСarousel from '../../components/ImageСarousel/ImageСarousel';

export const HomePage: React.FC = () => {
  return (
    <div className={styles.homePage}>
      <h1 className={styles.homePage__title_mobile}>Product Catalog</h1>
      <h2 className={styles.homePage__title}>Welcome to Nice Gadgets store!</h2>

      <ImageСarousel />

      <ProductСarousel />

      <ShopByCategory />

      <ProductСarousel hotPrice={true} />
    </div>
  );
};

export default HomePage;
