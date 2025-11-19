import styles from './HomePage.module.scss';
import { ShopByCategory } from '../../components/ShopByCategory';
import { ProductСarousel } from '../../components/ProductСarousel';

export const HomePage: React.FC = () => {
  return (
    <div className={styles.homePage}>
      <h1 className={styles.homePage__title}>Welcome to Nice Gadgets store!</h1>

      <ProductСarousel />

      <ShopByCategory />

      <ProductСarousel hotPrice={true} />
    </div>
  );
};

export default HomePage;
