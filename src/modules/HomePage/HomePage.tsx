import { Categories } from '../../components/Categories';
import { HotPrices } from '../../components/HotPrices';
import { NewModels } from '../../components/NewModels';
import { PicturesSlider } from '../../components/PicturesSlider';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles['home-page']}>
      <h1 className={styles['home-page__title']}>
        Welcome to Nice Gadgets store!
      </h1>

      <div className={styles['home-page__content']}>
        <PicturesSlider />
        <NewModels />
        <Categories />
        <HotPrices />
      </div>
    </div>
  );
};
