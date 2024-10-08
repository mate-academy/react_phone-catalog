import styles from './HomePage.module.scss';
import { Categories } from './components/Categories';
import { HotPrices } from './components/HotPrices';
import { NewModels } from './components/NewModels';
import { PicturesSlider } from './components/PicturesSlider';

export const HomePage = () => {
  return (
    <div className={styles.HomePage}>
      <h1 className={styles.HomePage__title}>Welcome to Nice Gadgets store!</h1>

      <div className={styles.HomePage__content}>
        <PicturesSlider />

        <NewModels />

        <Categories />

        <HotPrices />
      </div>
    </div>
  );
};
