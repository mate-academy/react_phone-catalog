import { ProductsStyleMode } from '../shared/types/types';
import styles from './HomePage.module.scss';
import { Categories } from './components/Categories';
import { PicturesSlider } from './components/PicturesSlider';
import { ProductsList } from './components/ProductsList';

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Nice Gadgets store!</h1>

      <div className={styles.elements}>
        <PicturesSlider />

        <ProductsList productsStyle={ProductsStyleMode.New} />

        <Categories />

        <ProductsList productsStyle={ProductsStyleMode.Hot} />
      </div>
    </div>
  );
};
