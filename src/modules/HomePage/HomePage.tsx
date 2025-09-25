import Slider from './components/Slider';
import styles from './HomePage.module.scss';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';
import Category from './components/Category/Category';
import ProductSlider from '../../components/ProductSlider/ProductSlider';

export const HomePage: React.FC = () => {
  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.header__title}>Welcome to Nice Gadgets store!</h1>
        <Slider />
        <ProductSlider
          title="Brand new models"
          showOldPrice={false}
          limit={10}
        />
        <Category />
        <ProductSlider title="Hot prices" showOldPrice={true} limit={10} />
      </div>
    </>
  );
};
