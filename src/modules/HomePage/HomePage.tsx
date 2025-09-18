import Slider from './components/Slider';
import styles from './HomePage.module.scss';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';
import BrandNewModals from './components/BrandNewModels/BrandNewModels';
import Category from './components/Category/Category';
import HotPrice from './components/HotPrices/HotPrices';
import { Footer } from '../../components/Footer';

export const HomePage: React.FC = () => {
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.header__title}>Welcome to Nice Gadgets store!</h1>
        <Slider />
        <BrandNewModals />
        <Category />
        <HotPrice />
      </div>
      <Footer />
    </>
  );
};
